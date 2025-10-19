import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MacroResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface PhysicalDetails {
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
}

export const MacroCalculator = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'contact' | 'results'>('details');
  const [physicalDetails, setPhysicalDetails] = useState<PhysicalDetails>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [macroResults, setMacroResults] = useState<MacroResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateMacros = (details: PhysicalDetails): MacroResults => {
    const age = parseFloat(details.age);
    const weight = parseFloat(details.weight);
    const height = parseFloat(details.height);

    let bmr: number;

    if (details.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const tdee = bmr * activityMultipliers[details.activityLevel];

    let targetCalories: number;
    if (details.goal === "lose") {
      targetCalories = tdee - 500;
    } else if (details.goal === "gain") {
      targetCalories = tdee + 300;
    } else {
      targetCalories = tdee;
    }

    const protein = Math.round(weight * 2.2);
    const fats = Math.round((targetCalories * 0.25) / 9);
    const remainingCalories = targetCalories - (protein * 4) - (fats * 9);
    const carbs = Math.round(remainingCalories / 4);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein,
      carbs,
      fats,
    };
  };

  const handleDetailsSubmit = () => {
    if (!physicalDetails.age || !physicalDetails.gender || !physicalDetails.weight ||
        !physicalDetails.height || !physicalDetails.activityLevel || !physicalDetails.goal) {
      return;
    }

    const results = calculateMacros(physicalDetails);
    setMacroResults(results);
    setStep('contact');
  };

  const handleContactSubmit = async () => {
    if (!name || !email || !email.includes('@') || !macroResults) {
      return;
    }

    setIsSubmitting(true);

    try {
      await supabase.from('macro_calculations').insert({
        name,
        email,
        age: parseInt(physicalDetails.age),
        gender: physicalDetails.gender,
        weight: parseFloat(physicalDetails.weight),
        height: parseFloat(physicalDetails.height),
        activity_level: physicalDetails.activityLevel,
        goal: physicalDetails.goal,
        bmr: macroResults.bmr,
        tdee: macroResults.tdee,
        target_calories: macroResults.targetCalories,
        protein: macroResults.protein,
        carbs: macroResults.carbs,
        fats: macroResults.fats,
      });

      await fetch("https://script.google.com/macros/s/AKfycby19uhDJsWjvcpiYvv85sThLW3CzX0rHsGgzMed16uQpQVLMAkIBTgVCNFeO3grDJhZVQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      setStep('results');
    } catch (error) {
      console.error('Error submitting data:', error);
      setStep('results');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setStep('details');
    setPhysicalDetails({
      age: "",
      gender: "",
      weight: "",
      height: "",
      activityLevel: "",
      goal: "",
    });
    setName("");
    setEmail("");
    setMacroResults(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => resetCalculator(), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="glass-intense border-primary/40 hover:border-primary text-foreground font-semibold px-6 py-6 rounded-full transition-all duration-300 hover:scale-105"
        >
          <Calculator className="mr-2" size={20} />
          Macro Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-intense border-primary/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text text-center mb-4">
            Fitness Macro Calculator
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-2xl font-bold gradient-text">Let's Calculate Your Macros</h3>
                <p className="text-foreground/70">Enter your details for personalized results</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground/90 font-medium">
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={physicalDetails.age}
                    onChange={(e) => setPhysicalDetails({...physicalDetails, age: e.target.value})}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-foreground/90 font-medium">
                    Gender
                  </Label>
                  <Select
                    value={physicalDetails.gender}
                    onValueChange={(value) => setPhysicalDetails({...physicalDetails, gender: value})}
                  >
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-foreground/90 font-medium">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70"
                    value={physicalDetails.weight}
                    onChange={(e) => setPhysicalDetails({...physicalDetails, weight: e.target.value})}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="text-foreground/90 font-medium">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={physicalDetails.height}
                    onChange={(e) => setPhysicalDetails({...physicalDetails, height: e.target.value})}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity" className="text-foreground/90 font-medium">
                    Activity Level
                  </Label>
                  <Select
                    value={physicalDetails.activityLevel}
                    onValueChange={(value) => setPhysicalDetails({...physicalDetails, activityLevel: value})}
                  >
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                      <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (2x per day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-foreground/90 font-medium">
                    Goal
                  </Label>
                  <Select
                    value={physicalDetails.goal}
                    onValueChange={(value) => setPhysicalDetails({...physicalDetails, goal: value})}
                  >
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Muscle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleDetailsSubmit}
                disabled={!physicalDetails.age || !physicalDetails.gender || !physicalDetails.weight ||
                          !physicalDetails.height || !physicalDetails.activityLevel || !physicalDetails.goal}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105"
              >
                Calculate Macros
              </Button>
            </motion.div>
          )}

          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold gradient-text">Almost There!</h3>
                <p className="text-foreground/70">Enter your name and email to get your personalized macro results</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/90 font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <Button
                  onClick={handleContactSubmit}
                  disabled={isSubmitting || !email || !name}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? "Processing..." : "Show My Results"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'results' && macroResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="inline-block text-4xl mb-2"
                >
                  ✅
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text">Your Personalized Results, {name}!</h3>
                <p className="text-foreground/70">Based on your unique profile and goals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {macroResults.targetCalories}
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Target Calories/day
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {macroResults.protein}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Protein
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {macroResults.carbs}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Carbs
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {macroResults.fats}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Fats
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass bg-primary/10 p-4 rounded-xl border border-primary/20 space-y-2"
              >
                <p className="text-sm text-foreground/80">
                  <strong>Your BMR:</strong> {macroResults.bmr} kcal/day
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>Your TDEE:</strong> {macroResults.tdee} kcal/day
                </p>
                <p className="text-sm text-foreground/80 text-center pt-2 border-t border-primary/20 mt-2">
                  These macros are calculated using the Mifflin-St Jeor formula and tailored to your specific goals. Adjust as needed based on your progress.
                </p>
              </motion.div>

              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full glass-intense border-primary/40 hover:border-primary text-foreground font-semibold py-6 rounded-full transition-all duration-300"
              >
                Recalculate
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
