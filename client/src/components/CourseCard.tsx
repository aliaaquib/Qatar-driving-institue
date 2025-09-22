import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  capacity: string;
  price: string;
  rating: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

export default function CourseCard({ 
  title, 
  description, 
  duration, 
  capacity, 
  price, 
  rating, 
  features, 
  icon,
  popular = false 
}: CourseCardProps) {
  return (
    <Card className={`relative h-full hover-elevate transition-all duration-300 ${popular ? 'ring-2 ring-primary' : ''}`}>
      {popular && (
        <Badge className="absolute -top-2 left-4 z-10 bg-primary">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-bold" data-testid={`course-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Course Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{capacity}</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <Star className="w-4 h-4 text-chart-2" />
            <span>{rating} rating</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Course includes:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <span className="text-chart-1 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="text-center py-2">
          <div className="text-3xl font-bold text-primary" data-testid={`course-price-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {price}
          </div>
          <div className="text-sm text-muted-foreground">per course</div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          variant={popular ? "default" : "outline"}
          data-testid={`button-enroll-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}