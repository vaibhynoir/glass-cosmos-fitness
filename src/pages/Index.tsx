import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { RecipeSection } from "@/components/RecipeSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  const [visibleSection, setVisibleSection] = useState<'none' | 'ebook' | 'transformations'>('none');

  const handleShowEbook = () => {
    setVisibleSection(visibleSection === 'ebook' ? 'none' : 'ebook');
  };

  const handleShowTransformations = () => {
    setVisibleSection(visibleSection === 'transformations' ? 'none' : 'transformations');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Navigation onTransformationsClick={handleShowTransformations} />
        <Hero onEbookClick={handleShowEbook} />
        <About />
        
        <AnimatePresence mode="wait">
          {visibleSection === 'ebook' && (
            <motion.div
              key="ebook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <RecipeSection />
            </motion.div>
          )}
          
          {visibleSection === 'transformations' && (
            <motion.div
              key="transformations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Testimonials />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
