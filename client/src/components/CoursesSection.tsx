import { Badge } from "@/components/ui/badge";
import CourseCard from "./CourseCard";
import { Car, Truck, Bike, Monitor } from "lucide-react";

export default function CoursesSection() {
  const courses = [
    {
      title: "Light Vehicles",
      description: "Learn to drive cars, SUVs, and light commercial vehicles with confidence",
      duration: "4-6 weeks",
      capacity: "Max 4 students",
      price: "$1,200",
      rating: 4.9,
      popular: true,
      features: [
        "Basic vehicle operation and controls",
        "Traffic rules & road regulations", 
        "Practical road training sessions",
        "Parking & maneuvering techniques",
        "Highway and city driving"
      ],
      icon: <Car className="w-8 h-8 text-primary" />
    },
    {
      title: "Heavy Vehicles",
      description: "Professional training for trucks and commercial vehicles with CDL preparation",
      duration: "8-10 weeks",
      capacity: "Max 3 students",
      price: "$2,500",
      rating: 4.8,
      features: [
        "Commercial vehicle operation",
        "Load management & securing",
        "Highway and long-distance driving",
        "Safety protocols & inspections",
        "CDL test preparation"
      ],
      icon: <Truck className="w-8 h-8 text-primary" />
    },
    {
      title: "Motorcycle",
      description: "Comprehensive motorcycle riding training program for all skill levels",
      duration: "3-4 weeks",
      capacity: "Max 6 students",
      price: "$800",
      rating: 4.7,
      features: [
        "Balance & control fundamentals",
        "City & highway riding",
        "Safety gear & protective equipment",
        "Weather condition training",
        "Emergency maneuvers"
      ],
      icon: <Bike className="w-8 h-8 text-primary" />
    },
    {
      title: "Simulator",
      description: "Virtual reality driving training in a completely safe environment",
      duration: "2-3 weeks",
      capacity: "Max 8 students",
      price: "$600",
      rating: 4.6,
      features: [
        "Risk-free learning environment",
        "Various driving scenarios",
        "Instant feedback & correction",
        "Weather & hazard simulation",
        "Perfect for nervous beginners"
      ],
      icon: <Monitor className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section className="py-16 bg-card/30" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Sections To Learn
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Driving Course
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We have programs to fit your needs, whatever your situation or your requirements. 
            Choose a driving school is one of the most important decisions.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              duration={course.duration}
              capacity={course.capacity}
              price={course.price}
              rating={course.rating}
              popular={course.popular}
              features={course.features}
              icon={course.icon}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All courses include theory lessons, practical training, and test preparation
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">✓ Certified instructors</span>
            <span className="flex items-center">✓ Modern training vehicles</span>
            <span className="flex items-center">✓ Flexible scheduling</span>
            <span className="flex items-center">✓ Test preparation included</span>
          </div>
        </div>
      </div>
    </section>
  );
}