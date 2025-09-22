import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CoursesSection from "@/components/CoursesSection";
import AboutSection from "@/components/AboutSection";
import AdditionalLinks from "@/components/AdditionalLinks";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleTheme} />
      <main>
        <Hero />
        <CoursesSection />
        <AboutSection />
        <AdditionalLinks />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}