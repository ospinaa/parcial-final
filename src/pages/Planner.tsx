import { usePlanner, DAYS } from "../context/PlannerContext";
import type { PlannedRecipe } from "../context/PlannerContext";

function Planner() {
  const { plan, removeRecipe } = usePlanner();

  const assignedRecipes = Object.values(plan).filter(Boolean) as PlannedRecipe[];

  const totalDays = assignedRecipes.length;
  const totalCalories = assignedRecipes.reduce((sum, r) => sum + r.caloriesPerServing, 0);
  const avgCalories = totalDays > 0 ? Math.round(totalCalories / totalDays) : 0;

  const longestRecipe = assignedRecipes.reduce<PlannedRecipe | null>((prev, curr) => {
    if (!prev) return curr;
    return curr.prepTimeMinutes + curr.cookTimeMinutes > prev.prepTimeMinutes + prev.cookTimeMinutes
      ? curr
      : prev;
  }, null);

  return (
    <div>
      <h1>Plan Semanal</h1>

      <h2>Resumen</h2>
      <p>Dias con receta: {totalDays} / 5</p>
      <p>Total calorias aproximadas: {totalCalories} kcal</p>
      <p>Promedio de calorias: {avgCalories} kcal</p>
      <p>
        Receta con mayor tiempo total:{" "}
        {longestRecipe
          ? `${longestRecipe.name} (${longestRecipe.prepTimeMinutes + longestRecipe.cookTimeMinutes} min)`
          : "Ninguna"}
      </p>

      <h2>Dias</h2>
      {DAYS.map((day) => {
        const recipe = plan[day];
        return (
          <div key={day}>
            <h3>{day}</h3>
            {recipe ? (
              <div>
                <img src={recipe.image} alt={recipe.name} width={100} />
                <p>{recipe.name}</p>
                <p>Dificultad: {recipe.difficulty}</p>
                <p>{recipe.caloriesPerServing} kcal</p>
                <button onClick={() => removeRecipe(day)}>Quitar</button>
              </div>
            ) : (
              <p>Sin receta asignada</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Planner;
