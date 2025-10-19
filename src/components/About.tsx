import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, Flame, Zap, ArrowUp, Heart, Clock } from "lucide-react";
import amitImage from "@/assets/amit-garg.png";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
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
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block glass px-6 py-3 rounded-full mb-6">
            <p className="text-primary font-semibold text-sm tracking-wider">
              MY STORY
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Amit Garg</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Transforming IT professionals through science-based fitness and sustainable nutrition
          </p>
        </motion.div>

        {/* Image + Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-intense rounded-3xl p-8 animate-float">
              <img
                src={amitImage}
                alt="Amit Garg - Elite Fitness Coach"
                className="rounded-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 glass-intense p-6 rounded-2xl glow-gold">
                <div className="text-3xl font-bold gradient-text">4+</div>
                <div className="text-sm text-foreground/70">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">
              Your Partner in <span className="gradient-text">Transformation</span>
            </h3>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                As someone who understands the unique challenges of the IT industry—long hours,
                desk-bound work, and high stress—I've dedicated my career to helping professionals
                like you reclaim their health and vitality.
              </p>
              <p>
                My approach combines evidence-based training protocols, personalized nutrition
                strategies, and sustainable lifestyle modifications that fit seamlessly into your
                demanding schedule.
              </p>
              <p>
                With over 200 successful transformations and a 92% client success rate, I've proven
                that sustainable fat loss and optimal health are achievable—even with the busiest
                lifestyle.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { label: "Clients Coached", value: "200+" },
                { label: "Success Rate", value: "92%" },
                { label: "Avg. Fat Loss", value: "15-25kg" },
                { label: "Satisfaction", value: "5★" },
              ].map((stat, index) => (
                <div key={index} className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The <span className="gradient-text">Journey</span>
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:flex-row`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    } text-center md:text-inherit`}
                  >
                    <div className="glass-intense p-6 rounded-2xl inline-block">
                      <div className="text-primary font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="text-2xl font-bold mb-2">{milestone.title}</h4>
                      <p className="text-foreground/70">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="glass-intense p-4 rounded-full glow-gold">
                      <milestone.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
