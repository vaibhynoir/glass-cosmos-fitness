import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Flame, Target, Heart, ArrowUp, Zap, Clock } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const story = [
    {
      year: "2019",
      title: "Back in 2019, I Shed Almost 25 Kilograms",
      description:
        "Here’s my journey and the wisdom it imparted. This isn’t about achievements — it’s about perseverance and rediscovering self-belief.",
      icon: Sparkles,
    },
    {
      year: "Before",
      title: "Tried Changing Myself, But Never Really Tried Tried!",
      description:
        "I avoided mirrors, wore loose t-shirts, and convinced myself I was fine. But deep down, I knew I was evading my true self.",
      icon: Target,
    },
    {
      year: "2017",
      title: "The Wake-Up Call",
      description:
        "After seeing a photo at a friend’s wedding, I realized it was time to change. I joined a gym between office hours and refused to make excuses.",
      icon: Flame,
    },
    {
      year: "Week 4",
      title: "No Progress — Yet No Giving Up",
      description:
        "Four weeks in, I saw zero results. But I persisted. By week five, I lost 1.5 kilograms — proof that consistency beats motivation.",
      icon: Zap,
    },
    {
      year: "Turning Point",
      title: "Results, Confidence & No Turning Back",
      description:
        "The mirror stopped being my enemy. From 95kg to 70kg — not just a body transformation, but a mindset revolution.",
      icon: ArrowUp,
    },
    {
      year: "Lesson",
      title: "Good Health Is Essential",
      description:
        "It’s not just about looking fit — it’s about discipline, self-respect, and caring for your loved ones. True transformation starts within.",
      icon: Heart,
    },
    {
      year: "Regret",
      title: "My Only Regret?",
      description:
        "That I didn’t start sooner. But there’s no deadline. It’s never too late. Don’t wait for the ‘perfect time’ — start now.",
      icon: Clock,
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block glass px-6 py-3 rounded-full mb-6">
            <p className="text-primary font-semibold text-sm tracking-wider">MY STORY</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The <span className="gradient-text">Transformation Journey</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            A story of resilience, growth, and rediscovering self-confidence.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {story.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div
                  className={`glass-intense p-8 md:w-[45%] rounded-2xl shadow-lg ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <div className="text-primary font-semibold mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Icon in the center */}
                <div className="absolute md:relative left-1/2 -translate-x-1/2 md:translate-x-0 flex justify-center items-center z-10 my-8 md:my-0">
                  <div className="glass-intense p-4 rounded-full glow-gold">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-24"
        >
          <p className="text-xl text-foreground/70 mb-4">
            Every transformation starts with one step.
          </p>
          <button className="px-8 py-4 rounded-xl glass-intense text-lg font-semibold gradient-text hover:scale-105 transition-transform">
            Begin Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};
