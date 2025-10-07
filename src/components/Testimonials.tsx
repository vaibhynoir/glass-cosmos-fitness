import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  mainImage: string; // now holds the Instagram embed HTML
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Ensure the Instagram embed script exists
    const scriptUrl = "https://www.instagram.com/embed.js";
    let script = document.querySelector(`script[src="${scriptUrl}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    }

    // Wait for script to load before processing embeds
    const processEmbeds = () => {
      if ((window as any).instgrm?.Embeds) {
        (window as any).instgrm.Embeds.process();
        setLoaded(true);
      } else {
        setTimeout(processEmbeds, 500);
      }
    };

    processEmbeds();
  }, []);

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
      {!loaded && (
        <div className="flex items-center justify-center h-[400px] text-gray-500 text-sm">
          Loading Instagram post...
        </div>
      )}
      <div
        ref={embedRef}
        className={`${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
        dangerouslySetInnerHTML={{ __html: testimonial.mainImage }}
      />
    </div>
  );
};

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials: Testimonial[] = [
    {
      name: "Rajesh Kumar",
      role: "Senior Software Engineer",
      company: "Tech Corp",
      quote: "Life-changing results even with a busy schedule!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8j3VbTN23o/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      company: "StartupXYZ",
      quote: "Science-based and easy to follow!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jjdQuRYlg/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Arjun Mehta",
      role: "Tech Lead",
      company: "MegaCorp",
      quote: "23kg down and stronger than ever.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jm9lsPGEX/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist",
      company: "AI Solutions",
      quote: "Tailored perfectly for my lifestyle!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jjMULu3kA/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
            Join hundreds of professionals who have transformed their lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>

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
