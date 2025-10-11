import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import amitBefore from "@/assets/before.jpg"; // Replace with your actual image import
import amitAfter from "@/assets/after.jpg";  // Replace with your actual image import

export const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Timeline steps for story blocks
  const storyBlocks = [
    {
      title: "Back in 2019, I shed almost 25 kilograms.",
      subtitle: "Here's my journey and the wisdom it imparted.",
      image: amitBefore,
    },
    {
      title: "Tried changing myself but never really tried!",
      subtitle:
        "My appearance bothered me immensely, yet I spent years evading it. I started to care about confidence and my reflection after entering the corporate world.",
      image: amitAfter,
    },
    {
      title: "My Daily Routine",
      subtitle:
        "Wake up → Get Ready → Get to office → Eat heavy food, snacks, and repeat. Day in, day out—never truly content.",
    },
    {
      title: "No Progress, But I Persisted",
      subtitle:
        "For the initial 4 weeks, I didn't make any progress. I kept showing up even when I felt like giving up, and finally, the scales moved.",
    },
    {
      title: "Once I Saw Results, My Confidence Soared",
      subtitle:
        "After four weeks, my confidence improved. Ultimately, I reached 70 kg with visible abs. The turning point came when I didn't quit, even during stagnant days.",
    },
    {
      title: "My Only Regret: Should've Started Earlier",
      subtitle:
        "But you know the best part? There’s NO DEADLINE. Commence now. Don’t await an ‘epiphany’ or New Year’s resolution.",
    },
    {
      title: "But Good Health Is Essential",
      subtitle:
        "Over time, I've realized that appearances aren't everything. Life encompasses much more than looking good—it's about self-love, discipline, and showing up for those who matter.",
    },
  ];

  return (
    <section id="story" className="py-32 relative overflow-hidden">
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
              MY TRANSFORMATION STORY
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Shedding 25kg: <span className="gradient-text">Amit's Real Journey</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Real struggles. Real results. From self-doubt to discipline—and how good health leads to true fulfillment.
          </p>
        </motion.div>

        {/* Story Timeline */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Images Block: before and after */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-intense rounded-3xl p-8 animate-float flex flex-col gap-6">
              <div className="flex gap-6 items-center justify-center">
                <img
                  src={amitBefore}
                  alt="Before Transformation"
                  className="rounded-2xl w-1/2 object-cover"
                />
                <img
                  src={amitAfter}
                  alt="After Transformation"
                  className="rounded-2xl w-1/2 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-4 glass-intense p-6 rounded-2xl glow-gold">
                <div className="text-3xl font-bold gradient-text">25kg</div>
                <div className="text-sm text-foreground/70">Fat Lost</div>
              </div>
            </div>
          </motion.div>

          {/* Story Timeline Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            {storyBlocks.map((block, idx) => (
              <div key={idx} className="glass p-6 rounded-xl mb-4">
                <div className="text-xl font-bold gradient-text mb-2">{block.title}</div>
                <div className="text-foreground/80 text-lg">{block.subtitle}</div>
                {block.image && (
                  <img
                    src={block.image}
                    alt={block.title}
                    className="rounded-xl mt-6 w-full object-cover"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Motivational CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Ready for Your Transformation?
          </h3>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Don't wait for a perfect moment. Start your journey today—because there's never a deadline to become the best version of yourself.
          </p>
          {/* Call to Action Button */}
          <a
            href="#contact"
            className="glass px-8 py-4 rounded-full font-bold text-primary text-lg hover:bg-primary/10 transition"
          >
            Start Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};
