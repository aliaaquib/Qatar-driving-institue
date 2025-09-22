import { Car, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Courses", href: "#courses" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Register", href: "#register" }
  ];

  const courses = [
    { name: "Light Vehicles", href: "#" },
    { name: "Heavy Vehicles", href: "#" },
    { name: "Motorcycle", href: "#" },
    { name: "Simulator Training", href: "#" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+974 4414-1332", href: "tel:+97444141332" },
    { icon: Mail, text: "info@qatar-driving.com", href: "mailto:info@qatar-driving.com" },
    { icon: MapPin, text: "Qatar", href: "#" }
  ];

  return (
    <footer className="bg-card border-t" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Qatar Driving</div>
                <div className="text-xs text-muted-foreground">Institute</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You have reached the right place to learn driving. Institute Qatar Driving offers you the service you need. 
              Your trusted partner for professional driving education.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 8AM-6PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Courses</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <a 
                    href={course.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-course-${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-start space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`footer-contact-${index}`}
                >
                  <info.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full" data-testid="footer-button-register">
                Register Today
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Qatar Driving Institute. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}