import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { RecipeSection } from "@/components/RecipeSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
