import { createContext, useContext, useState } from "react";

export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export const DAYS: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export interface PlannedRecipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  assignedDay: DayName;
}

interface PlannerContextType {
  plan: Partial<Record<DayName, PlannedRecipe>>;
  assignRecipe: (recipe: Omit<PlannedRecipe, "assignedDay">, day: DayName) => string | null;
  removeRecipe: (day: DayName) => void;
}

const PlannerContext = createContext<PlannerContextType | null>(null);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Partial<Record<DayName, PlannedRecipe>>>({});

  function assignRecipe(recipe: Omit<PlannedRecipe, "assignedDay">, day: DayName): string | null {
    const alreadyAssigned = Object.entries(plan).find(
      ([d, r]) => r?.id === recipe.id && d !== day
    );
    if (alreadyAssigned) {
      return `Esta receta ya esta asignada el ${alreadyAssigned[0]}.`;
    }
    setPlan((prev) => ({ ...prev, [day]: { ...recipe, assignedDay: day } }));
    return null;
  }

  function removeRecipe(day: DayName) {
    setPlan((prev) => {
      const next = { ...prev };
      delete next[day];
      return next;
    });
  }

  return (
    <PlannerContext.Provider value={{ plan, assignRecipe, removeRecipe }}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
