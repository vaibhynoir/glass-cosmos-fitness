import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const story = [
    {
      title: "Back in 2019, I Shed Almost 25 Kilograms.",
      content:
        "Here’s my journey and the wisdom it imparted. This isn’t about achievements — it’s about perseverance and rediscovering self-belief.",
    },
    {
      title: "Tried Changing Myself, But Never Really Tried Tried!",
      content:
        "I used to avoid mirrors, oversized shirts became my armor, and I convinced myself I was fine. Deep down, I wasn’t. I was evading myself.",
    },
    {
      title: "The Wake-Up Call",
      content:
        "In 2017, after seeing a photo from a friend’s wedding, I knew something had to change. I joined a gym between office and home — it wasn’t easy, but it was necessary.",
    },
    {
      title: "For the Initial 4 Weeks, I Didn’t Make Any Progress.",
      content:
        "I kept going. I refused to give up. By week five, I lost 1.5 kilograms. That tiny win changed everything. Persistence had finally paid off.",
    },
    {
      title: "Once I Saw Results and My Confidence Improving, There Was No Turning Back.",
      content:
        "From 95 kilograms down to 70. A full transformation — not just physical but mental. The mirror was no longer my enemy.",
    },
    {
      title: "But Good Health Is Essential.",
      content:
        "It’s not about abs or aesthetics — it’s about self-love, discipline, and caring for the people who matter. Transformation is a journey inward.",
    },
    {
      title: "My Only Regret?",
      content:
        "That I didn’t start earlier. But you know what? There’s no deadline. It’s never ‘too late’. Don’t wait for an epiphany. Begin now.",
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
            The <span className="gradient-text">Transformation Journey</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            A story of discipline, resilience, and finding strength beyond the mirror.
          </p>
        </motion.div>

        {/* Storytelling Flow */}
        <div className="space-y-24 max-w-4xl mx-auto">
          {story.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`glass-intense p-8 rounded-3xl ${
                index % 2 === 0 ? "md:text-left" : "md:text-right"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
                {item.title}
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-24"
        >
          <p className="text-xl text-foreground/70 mb-4">
            Transformation begins with a single step.
          </p>
          <button className="px-8 py-4 rounded-xl glass-intense text-lg font-semibold gradient-text hover:scale-105 transition-transform">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};
