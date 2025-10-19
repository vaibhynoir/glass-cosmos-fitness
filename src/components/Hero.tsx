import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Animated Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Transform Your Body,
              <br />
              <span className="gradient-text text-glow-gold">
                Elevate Your Life
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
            >
              Specialized fat loss coaching for IT professionals. Proven systems,
              personalized strategies, and transformative results.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12"
            >
              {[
                { number: "200+", label: "Transformations" },
                { number: "4+", label: "Years Experience" },
                { number: "92%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="glass-intense p-6 rounded-2xl">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            >
              <Button
                onClick={() => scrollToSection("Ebook")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-7 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105 group"
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection("about")}
                variant="outline"
                className="glass-intense border-primary/40 hover:border-primary text-foreground font-semibold px-8 py-7 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
