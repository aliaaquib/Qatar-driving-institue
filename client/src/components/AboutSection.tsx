import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Shield, Clock, Users, Zap } from "lucide-react";
import facilityImage from "@assets/generated_images/Driving_school_facility_34f81836.png";
import classroomImage from "@assets/generated_images/Driving_school_classroom_9e7fc3ce.png";

export default function AboutSection() {
  const features = [
    {
      icon: Award,
      title: "Certified Instructors",
      description: "All our instructors are certified professionals with years of experience"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Modern vehicles equipped with dual controls and safety features"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Choose from morning, afternoon, or evening classes that fit your schedule"
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 4 students per class ensures personalized attention"
    },
    {
      icon: Zap,
      title: "Quick Results",
      description: "Fast-track programs available for urgent requirements"
    },
    {
      icon: CheckCircle,
      title: "High Success Rate",
      description: "98% of our students pass their driving test on the first attempt"
    }
  ];

  const achievements = [
    { label: "Years of Excellence", value: "15+" },
    { label: "Students Graduated", value: "5,000+" },
    { label: "Success Rate", value: "98%" },
    { label: "Certified Instructors", value: "25+" }
  ];

  return (
    <section className="py-16" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About Qatar Driving Institute
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            About Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            You have reached the right place to learn driving. Institute Qatar Driving offers you the service you need. 
            We have programs to fit your needs, whatever your situation or your requirements. Choose a driving school is one of the most important decisions of all people need to learn to drive.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 hover-elevate">
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-primary mb-2" data-testid={`achievement-value-${index}`}>
                  {achievement.value}
                </div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Images */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={facilityImage} 
                alt="Modern driving school facility" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={classroomImage} 
                alt="State-of-the-art classroom with simulators" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Professional Driving Education
            </h3>
            <p className="text-muted-foreground">
              Leadership may contain risk, so it's important to find a school that care a lot about leadership. 
              We provide comprehensive training programs designed to build confidence and ensure safe driving practices.
            </p>
            <p className="text-muted-foreground">
              Our mission, vision and values guide everything we do, from our experienced instructors 
              to our modern training approach that prepares students for real-world driving situations.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-elevate">
              <CardContent className="pt-0">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`feature-title-${index}`}>
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}