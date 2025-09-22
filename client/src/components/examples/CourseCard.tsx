import CourseCard from '../CourseCard';
import { Car, Truck, Bike, Monitor } from "lucide-react";

export default function CourseCardExample() {
  const handleEnroll = () => {
    console.log('Enroll button clicked');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <CourseCard
        title="Light Vehicles"
        description="Learn to drive cars, SUVs, and light commercial vehicles"
        duration="4-6 weeks"
        capacity="Max 4 students"
        price="$1,200"
        rating={4.9}
        popular={true}
        features={[
          "Basic vehicle operation",
          "Traffic rules & regulations", 
          "Practical road training",
          "Parking & maneuvering"
        ]}
        icon={<Car className="w-8 h-8 text-primary" />}
      />
      
      <CourseCard
        title="Heavy Vehicles"
        description="Professional training for trucks and commercial vehicles"
        duration="8-10 weeks"
        capacity="Max 3 students"
        price="$2,500"
        rating={4.8}
        features={[
          "Commercial vehicle operation",
          "Load management",
          "Highway driving",
          "Safety protocols"
        ]}
        icon={<Truck className="w-8 h-8 text-primary" />}
      />

      <CourseCard
        title="Motorcycle"
        description="Comprehensive motorcycle riding training program"
        duration="3-4 weeks"
        capacity="Max 6 students"
        price="$800"
        rating={4.7}
        features={[
          "Balance & control",
          "City & highway riding",
          "Safety gear training",
          "Weather conditions"
        ]}
        icon={<Bike className="w-8 h-8 text-primary" />}
      />

      <CourseCard
        title="Simulator"
        description="Virtual reality driving training in safe environment"
        duration="2-3 weeks"
        capacity="Max 8 students"
        price="$600"
        rating={4.6}
        features={[
          "Risk-free learning",
          "Various scenarios",
          "Instant feedback",
          "Weather simulation"
        ]}
        icon={<Monitor className="w-8 h-8 text-primary" />}
      />
    </div>
  );
}