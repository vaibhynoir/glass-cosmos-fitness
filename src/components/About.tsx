import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Target, Users, TrendingUp } from "lucide-react";
import amitImage from "@/assets/amit-garg.png";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    {
      year: "2010",
      title: "Journey Begins",
      description: "Started personal fitness transformation journey",
      icon: Target,
    },
    {
      year: "2015",
      title: "Certified Coach",
      description: "Became certified fitness and nutrition coach",
      icon: Award,
    },
    {
      year: "2018",
      title: "IT Specialist",
      description: "Focused on helping IT professionals achieve their goals",
      icon: Users,
    },
    {
      year: "2025",
      title: "500+ Transformations",
      description: "Helped hundreds transform their lives",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
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
                <div className="text-3xl font-bold gradient-text">15+</div>
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
                With over 500 successful transformations and a 98% client success rate, I've proven
                that sustainable fat loss and optimal health are achievable—even with the busiest
                lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { label: "Clients Coached", value: "500+" },
                { label: "Success Rate", value: "98%" },
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
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center md:text-inherit`}>
                    <div className="glass-intense p-6 rounded-2xl inline-block">
                      <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
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
