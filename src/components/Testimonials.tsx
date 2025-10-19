import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MasonryGrid } from "@/components/ui/image-testimonial-grid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const InstagramEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: "3px",
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px",
        maxWidth: "540px",
        minWidth: "326px",
        padding: 0,
        width: "100%",
      }}
    />
  );
};

export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [columns, setColumns] = useState(3);
  const navigate = useNavigate();

  const instagramPosts = [
    "https://www.instagram.com/p/C19ylpbS4Wn/",
    "https://www.instagram.com/reel/DPd5SYfk0fc/",
    "https://www.instagram.com/reel/DOOZXRdk-2j/",
    "https://www.instagram.com/reel/DOGUSU1k_7d/",
    "https://www.instagram.com/p/DN25Gt75nqn/",
    "https://www.instagram.com/p/DNLHhghyaiF/",
  ];

  const getColumns = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setColumns(getColumns(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.instgrm?.Embeds?.process();
    }, 100);
    return () => clearTimeout(timer);
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

        <MasonryGrid columns={columns} gap={4}>
          {instagramPosts.map((url, index) => (
            <InstagramEmbed key={index} url={url} />
          ))}
        </MasonryGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={() => navigate("/transformations")}
            size="lg"
            className="glass-intense hover:scale-105 transition-all duration-300"
          >
            Show More Transformations
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            { value: "200+", label: "Lives Changed" },
            { value: "92%", label: "Success Rate" },
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
