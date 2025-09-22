import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Trophy, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/Driving_instructor_teaching_student_b06817d8.png";

export default function Hero() {
  const stats = [
    { icon: Users, label: "Students Trained", value: "5,000+" },
    { icon: Trophy, label: "Success Rate", value: "98%" },
    { icon: Clock, label: "Years Experience", value: "15+" },
  ];

  const benefits = [
    "Programs to fit your needs",
    "Professional instruction service",
    "Choose the right driving school",
    "Safe leadership training",
  ];

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional driving instruction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                You have reached the right place to
                <span className="text-primary block">Learn Driving</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Institute Qatar Driving offers you the service you need. We have
                programs to fit your needs, whatever your situation or your
                requirements.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-chart-1 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8"
                data-testid="button-register-now"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                data-testid="button-view-courses"
              >
                View Courses
              </Button>
            </div>
          </div>

          {/* Right column - Stats */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover-elevate">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold text-foreground"
                        data-testid={`stat-value-${index}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
