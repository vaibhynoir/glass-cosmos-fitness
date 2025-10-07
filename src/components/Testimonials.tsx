import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Senior Software Engineer",
      company: "Tech Corp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      before: "92kg",
      after: "68kg",
      duration: "6 months",
      quote:
        "Amit's program fit perfectly into my demanding IT schedule. Lost 24kg without giving up my favorite foods or spending hours in the gym. Life-changing!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      company: "StartupXYZ",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      before: "78kg",
      after: "60kg",
      duration: "5 months",
      quote:
        "As someone who works 12-hour days, I thought fitness was impossible. Amit proved me wrong with a sustainable, science-based approach that actually works.",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      role: "Tech Lead",
      company: "MegaCorp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      before: "105kg",
      after: "82kg",
      duration: "8 months",
      quote:
        "23kg down and feeling stronger than ever. Amit's personalized nutrition and training plans are worth every penny. Best investment I've made in myself.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist",
      company: "AI Solutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      before: "85kg",
      after: "65kg",
      duration: "7 months",
      quote:
        "Finally found a coach who understands the IT lifestyle. No generic advice—everything was tailored to my schedule, stress levels, and goals.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block glass px-6 py-3 rounded-full mb-6">
            <p className="text-primary font-semibold text-sm tracking-wider">
              SUCCESS STORIES
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Real People, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Join hundreds of IT professionals who have transformed their lives
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-intense rounded-3xl p-8 md:p-12 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-20">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
              {/* Avatar & Info */}
              <div className="text-center md:text-left space-y-4">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 mx-auto md:mx-0">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 glass-intense px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold">{testimonials[activeIndex].name}</h4>
                  <p className="text-foreground/70 text-sm">{testimonials[activeIndex].role}</p>
                  <p className="text-foreground/50 text-xs">{testimonials[activeIndex].company}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="glass p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-secondary">
                      {testimonials[activeIndex].before}
                    </div>
                    <div className="text-xs text-foreground/60">Before</div>
                  </div>
                  <div className="glass p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-primary">
                      {testimonials[activeIndex].after}
                    </div>
                    <div className="text-xs text-foreground/60">After</div>
                  </div>
                  <div className="glass p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-accent">
                      {testimonials[activeIndex].duration.split(" ")[0]}
                    </div>
                    <div className="text-xs text-foreground/60">Months</div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="md:col-span-2 space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 italic">
                  "{testimonials[activeIndex].quote}"
                </p>

                {/* Weight Loss Achievement */}
                <div className="glass p-4 rounded-2xl inline-block">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold gradient-text">
                      -{parseInt(testimonials[activeIndex].before) - parseInt(testimonials[activeIndex].after)}kg
                    </div>
                    <div className="text-sm text-foreground/70">
                      in {testimonials[activeIndex].duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="glass hover:glass-intense border-primary/30 rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="glass hover:glass-intense border-primary/30 rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            { value: "500+", label: "Lives Changed" },
            { value: "98%", label: "Success Rate" },
            { value: "15-25kg", label: "Avg. Fat Loss" },
            { value: "4.9★", label: "Client Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="glass-intense p-6 rounded-2xl text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
