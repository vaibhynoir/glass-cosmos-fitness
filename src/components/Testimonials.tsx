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

  useEffect(() => {
    // Load Instagram embed script once globally
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Process embeds after render
    const processEmbeds = () => {
      if ((window as any).instgrm && (window as any).instgrm.Embeds) {
        (window as any).instgrm.Embeds.process();
      }
    };

    processEmbeds();
    const timer = setTimeout(processEmbeds, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={embedRef}
      className="relative rounded-2xl overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 bg-white"
      dangerouslySetInnerHTML={{ __html: testimonial.mainImage }}
    />
  );
};

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [columns, setColumns] = useState(4);

  const testimonials: Testimonial[] = [
    {
      name: "Rajesh Kumar",
      role: "Senior Software Engineer",
      company: "Tech Corp",
      quote:
        "Amit's program fit perfectly into my demanding IT schedule. Life-changing results!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8j3VbTN23o/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      company: "StartupXYZ",
      quote:
        "A sustainable, science-based approach that actually works for busy professionals.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jjdQuRYlg/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Arjun Mehta",
      role: "Tech Lead",
      company: "MegaCorp",
      quote:
        "23kg down and feeling stronger than ever. Personalized nutrition + training = success.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jm9lsPGEX/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist",
      company: "AI Solutions",
      quote:
        "Finally found a coach who understands the IT lifestyle — everything tailored to me!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jjMULu3kA/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Vikram Singh",
      role: "DevOps Engineer",
      company: "CloudTech",
      quote:
        "The transformation is real! Energized and confident again — best investment ever.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jlUEpRKwh/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Ananya Reddy",
      role: "UX Designer",
      company: "DesignHub",
      quote:
        "Lost weight while enjoying the journey — fitness finally feels sustainable.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jjMULu3kA/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Karthik Iyer",
      role: "Full Stack Developer",
      company: "WebSolutions",
      quote:
        "From desk-bound to fit and active — this program changed my entire perspective.",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jlUEpRKwh/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
    {
      name: "Meera Nair",
      role: "Business Analyst",
      company: "FinTech Pro",
      quote:
        "The best decision I made this year — feeling healthier and happier than ever!",
      mainImage: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C8jm9lsPGEX/?utm_source=ig_embed" data-instgrm-version="14" style="background:#FFF;border:0; margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
    },
  ];

  const getColumns = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  };

  useEffect(() => {
    const handleResize = () => setColumns(getColumns(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            Join hundreds of IT professionals who have transformed their lives
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-6`}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
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
