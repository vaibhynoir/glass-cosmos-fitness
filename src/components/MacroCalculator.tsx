import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
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

export const MacroCalculator = () => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState<MacroResults | null>(null);
  const [step, setStep] = useState<"form" | "email-capture" | "results">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Step 1: Validate form and move to email step ---
  const calculateMacros = () => {
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!ageNum || !heightNum || !weightNum || !gender || !activityLevel || !goal) {
      alert("Please fill all fields before continuing.");
      return;
    }

    setStep("email-capture");
  };

  // --- Step 2: Compute Macros ---
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
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
    };

    let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

    // Goal adjustments
    if (goal === "loss") tdee -= 500;
    else if (goal === "gain") tdee += 300;

    // Macro breakdown
    const protein = weightNum * 2.2; // g/kg
    const fats = weightNum * 1; // g/kg
    const remainingCalories = tdee - (protein * 4 + fats * 9);
    const carbs = remainingCalories / 4;

    return {
      calories: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  };

  // --- Step 3: Submit to Google Sheets ---
  const handleEmailSubmit = async () => {
    if (!name || !email.includes("@")) {
      alert("Please enter a valid name and email.");
      return;
    }

    setIsSubmitting(true);
    const macroResults = computeMacroResults();

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxBkwa2TUnflvU_70wmkwfm-4qkTcL1MBvVkQB_MANwmVNVQQEo9dNxQGjisphsot9p/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name,
            email,
            age,
            height,
            weight,
            gender,
            activityLevel,
            goal,
            calories: macroResults.calories.toString(),
            protein: macroResults.protein.toString(),
            carbs: macroResults.carbs.toString(),
            fats: macroResults.fats.toString(),
          }).toString(),
        }
      );

      setResults(macroResults);
      setStep("results");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Reset ---
  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeight("");
    setWeight("");
    setActivityLevel("");
    setGoal("");
    setResults(null);
    setStep("form");
    setName("");
    setEmail("");
  };

  // --- Render ---
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
          {/* Step 1 - Input Form */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                  <Label>Age</Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div>
                  <Label>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Height */}
                <div>
                  <Label>Height (cm)</Label>
                  <Input
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                {/* Weight */}
                <div>
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                {/* Activity */}
                <div>
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="very">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div>
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loss">Fat Loss</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="gain">Muscle Gain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={calculateMacros}
                className="w-full bg-primary text-white font-bold py-6 rounded-full text-lg hover:scale-105 transition-all"
              >
                Calculate Macros
              </Button>
            </motion.div>
          )}

          {/* Step 2 - Email Capture */}
          {step === "email-capture" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text">
                  Almost There!
                </h3>
                <p className="text-foreground/70">
                  Enter your name and email to get your personalized macro results.
                </p>
              </div>

              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-6 font-bold rounded-full hover:scale-105 transition-all"
              >
                {isSubmitting ? "Sending..." : "Show My Results"}
              </Button>
            </motion.div>
          )}

          {/* Step 3 - Results */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6 text-center"
            >
              <h3 className="text-2xl font-bold gradient-text">
                ✅ Your Macro Results
              </h3>
              <p className="text-foreground/70">
                (Example values below — yours will vary)
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <p className="text-3xl font-bold">{results.calories}</p>
                  <p>Calories/day</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-3xl font-bold">{results.protein}g</p>
                  <p>Protein</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-3xl font-bold">{results.carbs}g</p>
                  <p>Carbs</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-3xl font-bold">{results.fats}g</p>
                  <p>Fats</p>
                </div>
              </div>

              <p className="text-sm text-foreground/70 mt-4">
                💡 These are example macro outputs — real results are based on your unique inputs.
              </p>

              <Button onClick={resetCalculator} variant="outline" className="w-full py-4">
                Recalculate
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
