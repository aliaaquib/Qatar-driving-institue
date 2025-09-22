import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, Phone, Mail, User, Calendar } from "lucide-react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    course: "",
    startDate: "",
    experience: "",
    comments: "",
    agreeTerms: false,
    agreeMarketing: false
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      console.log('Files uploaded:', fileNames);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);
  };

  const courses = [
    { value: "light-vehicles", label: "Light Vehicles" },
    { value: "heavy-vehicles", label: "Heavy Vehicles" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "simulator", label: "Simulator Training" }
  ];

  return (
    <section className="py-16 bg-card/50" id="register">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Register for Your Course
          </h2>
          <p className="text-lg text-muted-foreground">
            Start your driving journey with our expert instructors
          </p>
        </div>

        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>
              Please fill in your details to begin the registration process
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="pl-10"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="pl-10"
                      required
                      data-testid="input-date-of-birth"
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-4">
                <Label>Course Selection *</Label>
                <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                  <SelectTrigger data-testid="select-course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  data-testid="input-start-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Driving Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger data-testid="select-experience">
                    <SelectValue placeholder="Select your driving experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No experience</SelectItem>
                    <SelectItem value="beginner">Beginner (under 1 year)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <Label>Required Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover-elevate">
                  <input
                    type="file"
                    id="documents"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    data-testid="input-documents"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload ID, Medical Certificate, and other required documents
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG files accepted
                    </p>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange("comments", e.target.value)}
                  placeholder="Any special requirements or questions?"
                  rows={3}
                  data-testid="textarea-comments"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                    data-testid="checkbox-terms"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-5">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    *
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) => handleInputChange("agreeMarketing", !!checked)}
                    data-testid="checkbox-marketing"
                  />
                  <Label htmlFor="agreeMarketing" className="text-sm leading-5">
                    I would like to receive updates about new courses and special offers
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!formData.agreeTerms}
                data-testid="button-submit-registration"
              >
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}