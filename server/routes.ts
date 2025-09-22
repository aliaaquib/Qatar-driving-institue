import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStudentSchema, 
  insertRegistrationSchema, 
  insertPaymentSchema,
  type Course,
  type Student,
  type Registration,
  type RegistrationWithDetails
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Student routes
  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      
      // Check if student with email already exists
      const existingStudent = await storage.getStudentByEmail(validatedData.email);
      if (existingStudent) {
        return res.status(409).json({ 
          error: "Student with this email already exists",
          code: "EMAIL_EXISTS" 
        });
      }

      const student = await storage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error: any) {
      console.error("Error creating student:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid student data", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create student" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudentWithRegistrations(req.params.id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.get("/api/students/email/:email", async (req, res) => {
    try {
      const student = await storage.getStudentByEmail(req.params.email);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      console.error("Error fetching student by email:", error);
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getActiveCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  // Registration routes
  app.post("/api/registrations", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if student and course exist
      const student = await storage.getStudent(validatedData.studentId);
      const course = await storage.getCourse(validatedData.courseId);
      
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Check course capacity
      const existingRegistrations = await storage.getCourseRegistrations(validatedData.courseId);
      const confirmedRegistrations = existingRegistrations.filter(reg => 
        reg.status === "confirmed" || reg.status === "pending"
      );
      
      if (confirmedRegistrations.length >= course.capacity) {
        return res.status(409).json({ 
          error: "Course is at full capacity",
          code: "COURSE_FULL" 
        });
      }

      const registration = await storage.createRegistration(validatedData);
      const registrationWithDetails = await storage.getRegistrationWithDetails(registration.id);
      
      res.status(201).json(registrationWithDetails);
    } catch (error: any) {
      console.error("Error creating registration:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid registration data", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create registration" });
    }
  });

  app.get("/api/registrations/:id", async (req, res) => {
    try {
      const registration = await storage.getRegistrationWithDetails(req.params.id);
      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }
      res.json(registration);
    } catch (error) {
      console.error("Error fetching registration:", error);
      res.status(500).json({ error: "Failed to fetch registration" });
    }
  });

  app.patch("/api/registrations/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }

      const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: "Invalid status", 
          validStatuses 
        });
      }

      const updatedRegistration = await storage.updateRegistrationStatus(req.params.id, status);
      if (!updatedRegistration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      const registrationWithDetails = await storage.getRegistrationWithDetails(req.params.id);
      res.json(registrationWithDetails);
    } catch (error) {
      console.error("Error updating registration status:", error);
      res.status(500).json({ error: "Failed to update registration status" });
    }
  });

  app.patch("/api/registrations/:id/payment-status", async (req, res) => {
    try {
      const { paymentStatus } = req.body;
      if (!paymentStatus || typeof paymentStatus !== "string") {
        return res.status(400).json({ error: "Payment status is required" });
      }

      const validStatuses = ["pending", "paid", "failed"];
      if (!validStatuses.includes(paymentStatus)) {
        return res.status(400).json({ 
          error: "Invalid payment status", 
          validStatuses 
        });
      }

      const updatedRegistration = await storage.updateRegistrationPaymentStatus(req.params.id, paymentStatus);
      if (!updatedRegistration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      const registrationWithDetails = await storage.getRegistrationWithDetails(req.params.id);
      res.json(registrationWithDetails);
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ error: "Failed to update payment status" });
    }
  });

  // Payment routes
  app.post("/api/payments", async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      
      // Check if registration exists
      const registration = await storage.getRegistration(validatedData.registrationId);
      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error: any) {
      console.error("Error creating payment:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid payment data", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create payment" });
    }
  });

  app.get("/api/payments/registration/:registrationId", async (req, res) => {
    try {
      const payment = await storage.getPaymentByRegistrationId(req.params.registrationId);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({ error: "Failed to fetch payment" });
    }
  });

  app.patch("/api/payments/:id/status", async (req, res) => {
    try {
      const { status, stripePaymentIntentId } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }

      const validStatuses = ["pending", "succeeded", "failed", "cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: "Invalid payment status", 
          validStatuses 
        });
      }

      const updatedPayment = await storage.updatePaymentRecordStatus(req.params.id, status, stripePaymentIntentId);
      if (!updatedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      res.json(updatedPayment);
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ error: "Failed to update payment status" });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "Elite Driving Institute API"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
