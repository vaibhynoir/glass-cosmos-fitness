import React, { useState } from "react";

const MacroCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain",
  });

  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Function to calculate real macros
  const computeMacroResults = () => {
    const { age, height, weight, gender, activityLevel, goal } = form;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    // BMR calculation
    let bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    // Activity multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    let calories = bmr * (activityMultipliers[activityLevel] || 1.55);

    // Goal adjustment
    if (goal === "cut") calories -= 300;
    else if (goal === "bulk") calories += 300;

    // Macronutrients
    const protein = w * 2; // grams
    const fats = (calories * 0.25) / 9; // grams
    const carbs = (calories - (protein * 4 + fats * 9)) / 4; // grams

    return {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  };

  // ✅ Send data to Google Sheet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const macroResults = computeMacroResults();
    setResults(macroResults);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxBkwa2TUnflvU_70wmkwfm-4qkTcL1MBvVkQB_MANwmVNVQQEo9dNxQGjisphsot9p/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            ...form,
            calories: macroResults.calories.toString(),
            protein: macroResults.protein.toString(),
            carbs: macroResults.carbs.toString(),
            fats: macroResults.fats.toString(),
          }).toString(),
        }
      );

      console.log("Data sent to Google Sheet ✅");
    } catch (err) {
      console.error("Error sending data:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Macro Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "email", "age", "height", "weight"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
            value={(form as any)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            required
          />
        ))}

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={form.activityLevel}
          onChange={(e) =>
            setForm({ ...form, activityLevel: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="veryActive">Very Active</option>
        </select>

        <select
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="maintain">Maintain</option>
          <option value="cut">Cut (Lose Fat)</option>
          <option value="bulk">Bulk (Gain Muscle)</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isSubmitting ? "Calculating..." : "Calculate Macros"}
        </button>
      </form>

      {results && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your Daily Macros:</h3>
          <p>Calories: {results.calories} kcal</p>
          <p>Protein: {results.protein} g</p>
          <p>Carbs: {results.carbs} g</p>
          <p>Fats: {results.fats} g</p>
        </div>
      )}
    </div>
  );
};

export default MacroCalculator;
