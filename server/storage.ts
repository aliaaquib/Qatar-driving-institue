import { 
  type User, 
  type InsertUser,
  type Student,
  type InsertStudent,
  type Course,
  type InsertCourse,
  type Registration,
  type InsertRegistration,
  type Payment,
  type InsertPayment,
  type StudentWithRegistrations,
  type RegistrationWithDetails
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Legacy user methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Student methods
  createStudent(student: InsertStudent): Promise<Student>;
  getStudent(id: string): Promise<Student | undefined>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  getStudentWithRegistrations(id: string): Promise<StudentWithRegistrations | undefined>;
  updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined>;

  // Course methods
  createCourse(course: InsertCourse): Promise<Course>;
  getCourse(id: string): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  getActiveCourses(): Promise<Course[]>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;

  // Registration methods
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistration(id: string): Promise<Registration | undefined>;
  getRegistrationWithDetails(id: string): Promise<RegistrationWithDetails | undefined>;
  getStudentRegistrations(studentId: string): Promise<Registration[]>;
  getCourseRegistrations(courseId: string): Promise<Registration[]>;
  updateRegistrationStatus(id: string, status: string): Promise<Registration | undefined>;
  updateRegistrationPaymentStatus(id: string, paymentStatus: string): Promise<Registration | undefined>;

  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByRegistrationId(registrationId: string): Promise<Payment | undefined>;
  updatePaymentRecordStatus(id: string, status: string, stripePaymentIntentId?: string): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private students: Map<string, Student>;
  private courses: Map<string, Course>;
  private registrations: Map<string, Registration>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.courses = new Map();
    this.registrations = new Map();
    this.payments = new Map();
    
    // Initialize with sample courses
    this.initializeSampleCourses();
  }

  private initializeSampleCourses() {
    const sampleCourses: Course[] = [
      {
        id: randomUUID(),
        title: "Light Vehicles",
        description: "Learn to drive cars, SUVs, and light commercial vehicles with confidence",
        type: "light-vehicles",
        duration: "4-6 weeks",
        capacity: 4,
        price: "1200.00",
        features: ["Basic vehicle operation and controls", "Traffic rules & road regulations", "Practical road training sessions", "Parking & maneuvering techniques", "Highway and city driving"],
        isActive: 1
      },
      {
        id: randomUUID(),
        title: "Heavy Vehicles",
        description: "Professional training for trucks and commercial vehicles with CDL preparation",
        type: "heavy-vehicles",
        duration: "8-10 weeks",
        capacity: 3,
        price: "2500.00",
        features: ["Commercial vehicle operation", "Load management & securing", "Highway and long-distance driving", "Safety protocols & inspections", "CDL test preparation"],
        isActive: 1
      },
      {
        id: randomUUID(),
        title: "Motorcycle",
        description: "Comprehensive motorcycle riding training program for all skill levels",
        type: "motorcycle",
        duration: "3-4 weeks",
        capacity: 6,
        price: "800.00",
        features: ["Balance & control fundamentals", "City & highway riding", "Safety gear & protective equipment", "Weather condition training", "Emergency maneuvers"],
        isActive: 1
      },
      {
        id: randomUUID(),
        title: "Simulator",
        description: "Virtual reality driving training in a completely safe environment",
        type: "simulator",
        duration: "2-3 weeks",
        capacity: 8,
        price: "600.00",
        features: ["Risk-free learning environment", "Various driving scenarios", "Instant feedback & correction", "Weather & hazard simulation", "Perfect for nervous beginners"],
        isActive: 1
      }
    ];

    sampleCourses.forEach(course => {
      this.courses.set(course.id, course);
    });
  }

  // Legacy user methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Student methods
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { 
      ...insertStudent, 
      id,
      drivingExperience: insertStudent.drivingExperience || null,
      comments: insertStudent.comments || null,
      createdAt: new Date()
    };
    this.students.set(id, student);
    return student;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.email === email,
    );
  }

  async getStudentWithRegistrations(id: string): Promise<StudentWithRegistrations | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;

    const studentRegistrations = Array.from(this.registrations.values())
      .filter(reg => reg.studentId === id);
    
    const registrationsWithDetails = studentRegistrations
      .map(reg => {
        const course = this.courses.get(reg.courseId);
        if (!course) return null; // Skip invalid course references
        const payment = Array.from(this.payments.values()).find(p => p.registrationId === reg.id);
        return { ...reg, course, payment };
      })
      .filter(reg => reg !== null) as (Registration & { course: Course; payment?: Payment })[];

    return { ...student, registrations: registrationsWithDetails };
  }

  async updateStudent(id: string, updateData: Partial<InsertStudent>): Promise<Student | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;

    const updatedStudent = { ...student, ...updateData };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  // Course methods
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { 
      ...insertCourse, 
      id,
      isActive: insertCourse.isActive ?? 1
    };
    this.courses.set(id, course);
    return course;
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getActiveCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isActive === 1);
  }

  async updateCourse(id: string, updateData: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;

    const updatedCourse = { ...course, ...updateData };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }

  // Registration methods
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    // Validate foreign key constraints
    const studentExists = this.students.has(insertRegistration.studentId);
    const courseExists = this.courses.has(insertRegistration.courseId);
    
    if (!studentExists) {
      throw new Error(`Student with ID ${insertRegistration.studentId} not found`);
    }
    if (!courseExists) {
      throw new Error(`Course with ID ${insertRegistration.courseId} not found`);
    }

    const id = randomUUID();
    const registration: Registration = { 
      ...insertRegistration,
      id,
      status: insertRegistration.status || "pending",
      paymentStatus: insertRegistration.paymentStatus || "pending",
      preferredStartDate: insertRegistration.preferredStartDate || null,
      registrationDate: new Date()
    };
    this.registrations.set(id, registration);
    return registration;
  }

  async getRegistration(id: string): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async getRegistrationWithDetails(id: string): Promise<RegistrationWithDetails | undefined> {
    const registration = this.registrations.get(id);
    if (!registration) return undefined;

    const student = this.students.get(registration.studentId);
    const course = this.courses.get(registration.courseId);
    
    if (!student || !course) {
      return undefined; // Invalid foreign key references
    }

    const payment = Array.from(this.payments.values()).find(p => p.registrationId === id);

    return { ...registration, student, course, payment };
  }

  async getStudentRegistrations(studentId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values())
      .filter(reg => reg.studentId === studentId);
  }

  async getCourseRegistrations(courseId: string): Promise<Registration[]> {
    return Array.from(this.registrations.values())
      .filter(reg => reg.courseId === courseId);
  }

  async updateRegistrationStatus(id: string, status: string): Promise<Registration | undefined> {
    const registration = this.registrations.get(id);
    if (!registration) return undefined;

    const updatedRegistration = { ...registration, status };
    this.registrations.set(id, updatedRegistration);
    return updatedRegistration;
  }

  async updateRegistrationPaymentStatus(id: string, paymentStatus: string): Promise<Registration | undefined> {
    const registration = this.registrations.get(id);
    if (!registration) return undefined;

    const updatedRegistration = { ...registration, paymentStatus };
    this.registrations.set(id, updatedRegistration);
    return updatedRegistration;
  }

  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = { 
      ...insertPayment, 
      id,
      status: insertPayment.status || "pending",
      currency: insertPayment.currency || "USD",
      stripePaymentIntentId: insertPayment.stripePaymentIntentId || null,
      createdAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByRegistrationId(registrationId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(p => p.registrationId === registrationId);
  }

  async updatePaymentRecordStatus(id: string, status: string, stripePaymentIntentId?: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (!payment) return undefined;

    const updatedPayment = { 
      ...payment, 
      status, 
      ...(stripePaymentIntentId && { stripePaymentIntentId })
    };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
}

export const storage = new MemStorage();
