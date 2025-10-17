import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

type Step = 'form' | 'email-capture' | 'results';

export const MacroCalculator = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<MacroResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateMacros = () => {
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!ageNum || !heightNum || !weightNum || !gender || !activityLevel || !goal) {
      return;
    }

    // Move to email capture step instead of showing results
    setStep('email-capture');
  };

  const computeMacroResults = (): MacroResults => {
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Mifflin-St Jeor Formula
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Activity multipliers
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
    };

    let tdee = bmr * activityMultipliers[activityLevel];

    // Goal adjustments
    if (goal === "loss") {
      tdee = tdee - 500; // 500 calorie deficit
    } else if (goal === "gain") {
      tdee = tdee + 300; // 300 calorie surplus
    }

    // Macro calculations
    const protein = weightNum * 2.2; // 2.2g per kg
    const fats = weightNum * 1; // 1g per kg
    const remainingCalories = tdee - (protein * 4 + fats * 9);
    const carbs = remainingCalories / 4;

    return {
      calories: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Google Sheets
      await fetch("https://script.google.com/macros/s/AKfycbxanlYNZ02vFxNvPKQvdSYv-1QoFx7skh-HPt9yBU39DpMg9mE8m-X0cAyuZhcvhwWD/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          age: age,
          height: height,
          weight: weight,
          gender: gender,
          activityLevel: activityLevel,
          goal: goal
        })
      });

      // Calculate and show results
      const macroResults = computeMacroResults();
      setResults(macroResults);
      setStep('results');
    } catch (error) {
      console.error("Error submitting data:", error);
      // Still show results even if submission fails
      const macroResults = computeMacroResults();
      setResults(macroResults);
      setStep('results');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeight("");
    setWeight("");
    setActivityLevel("");
    setGoal("");
    setEmail("");
    setResults(null);
    setStep('form');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground/90 font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-foreground/90 font-medium">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="glass-intense border-primary/20">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-foreground/90 font-medium">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-foreground/90 font-medium">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label htmlFor="activity" className="text-foreground/90 font-medium">
                    Activity Level
                  </Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent className="glass-intense border-primary/20">
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="very">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-foreground/90 font-medium">
                    Goal
                  </Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger className="glass bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent className="glass-intense border-primary/20">
                      <SelectItem value="loss">Fat Loss</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="gain">Muscle Gain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={calculateMacros}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105"
              >
                Calculate Macros
              </Button>
            </motion.div>
          )}

          {step === 'email-capture' && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-3 mb-8">
                <h3 className="text-2xl font-bold gradient-text">Almost There!</h3>
                <p className="text-foreground/80 text-lg">
                  Enter your email to get your personalized macro results.
                </p>
              </div>

              <div className="space-y-4">
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
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    className="glass bg-background/50 border-primary/20 focus:border-primary text-lg py-6"
                  />
                </div>

                <Button
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting || !email.includes('@')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Loading...' : 'Show My Results'}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2 mb-6 glass bg-primary/10 p-4 rounded-xl border border-primary/30"
              >
                <div className="text-2xl font-bold text-primary">✅ Your results are ready!</div>
              </motion.div>

              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold gradient-text">Your Personalized Macros</h3>
                <p className="text-foreground/70">Based on your profile and goals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {results.calories}
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Daily Calories
                  </div>
                </motion.div>

                {/* Protein */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {results.protein}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Protein
                  </div>
                </motion.div>

                {/* Carbs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {results.carbs}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Carbohydrates
                  </div>
                </motion.div>

                {/* Fats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {results.fats}g
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
                className="glass bg-primary/10 p-4 rounded-xl border border-primary/20"
              >
                <p className="text-sm text-foreground/80 text-center">
                  💡 These macros are calculated using the Mifflin-St Jeor formula and tailored to your specific goals. Adjust as needed based on your progress.
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
