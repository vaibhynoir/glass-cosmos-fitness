import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MasonryGrid } from "@/components/ui/image-testimonial-grid";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  before: string;
  after: string;
  duration: string;
  quote: string;
  rating: number;
  mainImage: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="relative rounded-2xl overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
    <img
      src={testimonial.mainImage}
      alt={testimonial.quote}
      className="w-full h-auto object-cover"
      onError={(e) => {
        e.currentTarget.src =
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=1200&q=80";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
    <div className="absolute top-0 left-0 p-4 text-white">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={testimonial.image}
          className="w-8 h-8 rounded-full border-2 border-white/80"
          alt={testimonial.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
              testimonial.name;
          }}
        />
        <span className="font-semibold text-sm drop-shadow-md">
          {testimonial.name}
        </span>
      </div>
      <p className="text-sm font-medium leading-tight drop-shadow-md">
        {testimonial.quote.substring(0, 80)}...
      </p>
    </div>
  </div>
);

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [columns, setColumns] = useState(4);

  const testimonials: Testimonial[] = [
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
      mainImage:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=1200&q=80",
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
      mainImage:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&h=1000&q=80",
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
      mainImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&h=1200&q=80",
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
      mainImage:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&h=1000&q=80",
    },
    {
      name: "Vikram Singh",
      role: "DevOps Engineer",
      company: "CloudTech",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      before: "98kg",
      after: "75kg",
      duration: "7 months",
      quote:
        "The transformation is real! Amit's approach to fitness made me feel energized and confident again.",
      rating: 5,
      mainImage:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&h=1200&q=80",
    },
    {
      name: "Ananya Reddy",
      role: "UX Designer",
      company: "DesignHub",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      before: "72kg",
      after: "58kg",
      duration: "5 months",
      quote:
        "Lost weight while enjoying the journey. Amit made fitness feel achievable and sustainable.",
      rating: 5,
      mainImage:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&h=1000&q=80",
    },
    {
      name: "Karthik Iyer",
      role: "Full Stack Developer",
      company: "WebSolutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik",
      before: "88kg",
      after: "70kg",
      duration: "6 months",
      quote:
        "From desk-bound to fit and active. This program changed my entire perspective on health.",
      rating: 5,
      mainImage:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&h=1200&q=80",
    },
    {
      name: "Meera Nair",
      role: "Business Analyst",
      company: "FinTech Pro",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
      before: "80kg",
      after: "62kg",
      duration: "6 months",
      quote:
        "The best decision I made this year. Feeling healthier and happier than ever!",
      rating: 5,
      mainImage:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&h=1000&q=80",
    },
  ];

  const getColumns = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  };

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

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

        <MasonryGrid columns={columns} gap={4}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </MasonryGrid>

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
