import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, BookOpen, Eye } from "lucide-react";

export default function AdditionalLinks() {
  const links = [
    {
      title: "Our Mission",
      icon: Eye,
      description: "Learn about our commitment to safe driving education",
      href: "#mission"
    },
    {
      title: "Our Vision", 
      icon: Eye,
      description: "Discover our vision for the future of driving education",
      href: "#vision"
    },
    {
      title: "Our Values",
      icon: BookOpen,
      description: "Understanding the values that guide our teaching",
      href: "#values"
    },
    {
      title: "Common Traffic Signs",
      icon: FileText,
      description: "Essential traffic signs every driver should know",
      href: "#traffic-signs"
    },
    {
      title: "Download Brochure",
      icon: Download,
      description: "Get detailed information about our courses",
      href: "#brochure"
    },
    {
      title: "Required Documents",
      icon: FileText,
      description: "Documents needed for course enrollment",
      href: "#documents"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Additional Resources
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access important information, resources, and documentation to support your driving education journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
                    <link.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`link-title-${index}`}>
                  {link.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {link.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => console.log(`${link.title} clicked`)}
                  data-testid={`button-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Qatar specific section */}
        <div className="mt-16 text-center">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Leadership & Safety
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leadership may contain risk, so it's important to find a school that care a lot about leadership. 
              We ensure that every student develops not just driving skills, but the responsible leadership 
              qualities needed for safe road navigation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}