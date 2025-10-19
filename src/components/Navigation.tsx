import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MacroCalculator } from "@/components/MacroCalculator";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "testimonials") {
      window.location.href = "/transformations";
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleJourneyClick = () => {
    window.open(
      "https://docs.google.com/forms/d/1gEswqUTqwT4Z7v0h486jT7gNwNu1GTIp_6i6bB48jjw/viewform?edit_requested=true",
      "_blank"
    );
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Transformations" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-intense py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start gap-0.5 md:flex-row md:items-center md:gap-3 pt-1"
          >
            <div className="text-lg md:text-2xl font-bold text-primary leading-tight">
              AMIT GARG
            </div>
            <div className="text-[9px] md:text-xs font-semibold tracking-wider text-foreground/70 uppercase mt-0.5 md:mt-0 md:border-l md:border-foreground/30 md:pl-3 leading-tight">
              Elite Fitness Coaching
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
            >
              <MacroCalculator />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={handleJourneyClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-6 rounded-full glow-coral transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 glass rounded-2xl p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-foreground/80 hover:text-primary transition-colors duration-300 font-medium py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="w-full">
              <MacroCalculator />
            </div>
            <Button
              onClick={handleJourneyClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full glow-coral"
            >
              Start Your Journey
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
