import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import recipeEbook from "@/assets/recipe-ebook.png";

export const RecipeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate email submission
      setIsSubmitted(true);
      toast.success("Success! Check your inbox for the recipe ebook.", {
        duration: 5000,
      });
      setEmail("");
    }
  };

  const features = [
    "Science-Backed Stress Tips",
    "Real-Life Practical Techniques",
    "Stress Types & Effects Explained",
    "Actionable Daily Habits",
    "Prevent Lifestyle Diseases",
    "Boost Focus & Energy",
  ];

  return (
    <section id="recipes" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block glass px-6 py-3 rounded-full mb-6">
            <p className="text-primary font-semibold text-sm tracking-wider">
              FREE RESOURCE
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Transform</span> Your Nutrition
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Download our exclusive recipe ebook designed specifically for busy IT professionals
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Ebook Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
                <img
                  src={recipeEbook}
                  alt="Free Recipe Ebook"
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-10 -left-4 glass-intense p-4 rounded-2xl glow-gold"
              >
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <div className="text-sm font-semibold">50+ Recipes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-10 -right-4 glass-intense p-4 rounded-2xl glow-burgundy"
              >
                <div className="text-2xl font-bold gradient-text">FREE</div>
                <div className="text-sm">Limited Time</div>
              </motion.div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Get Your Free <span className="gradient-text">Recipe Book</span>
                </h3>
                <p className="text-lg text-foreground/70">
                  Join 10,000+ professionals who have transformed their nutrition and achieved
                  sustainable fat loss.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2 text-foreground/80"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Email Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="glass-intense pl-12 pr-4 py-7 text-lg border-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-7 rounded-full text-lg glow-gold transition-all duration-300 hover:scale-105"
                  >
                    Download Free Ebook Now
                  </Button>
                  <p className="text-xs text-foreground/50 text-center">
                    No spam. Unsubscribe anytime. Your data is secure.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-intense p-8 rounded-2xl text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold">Check Your Email!</h4>
                  <p className="text-foreground/70">
                    Your free recipe ebook is on its way. Check your inbox (and spam folder) for
                    the download link.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
