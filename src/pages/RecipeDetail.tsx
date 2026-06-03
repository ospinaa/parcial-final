import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlanner, DAYS } from "../context/PlannerContext";
import type { DayName } from "../context/PlannerContext";

interface RecipeDetail {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  ingredients: string[];
  instructions: string[];
}

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayName>("Monday");
  const [message, setMessage] = useState<string | null>(null);

  const { assignRecipe, plan } = usePlanner();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Receta no encontrada");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleAssign() {
    if (!recipe) return;
    const existing = plan[selectedDay];
    if (existing && existing.id !== recipe.id) {
      const confirmed = window.confirm(
        `${selectedDay} ya tiene asignado "${existing.name}". Reemplazar?`
      );
      if (!confirmed) return;
    }
    const err = assignRecipe(
      {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        caloriesPerServing: recipe.caloriesPerServing,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
      },
      selectedDay
    );
    setMessage(err ?? `Receta asignada el ${selectedDay}.`);
    setTimeout(() => setMessage(null), 3000);
  }

  if (loading) return <p>Cargando receta...</p>;
  if (error || !recipe) return <p>Error: {error}</p>;

  return (
    <div>
      <img src={recipe.image} alt={recipe.name} width={400} />
      <h1>{recipe.name}</h1>
      <p>Cocina: {recipe.cuisine} | Tipo: {recipe.mealType?.join(", ")}</p>
      <p>
        Dificultad: {recipe.difficulty} | Prep: {recipe.prepTimeMinutes} min |
        Coccion: {recipe.cookTimeMinutes} min | {recipe.caloriesPerServing} kcal
      </p>

      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2>Instrucciones</h2>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h2>Agregar al plan semanal</h2>
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value as DayName)}
      >
        {DAYS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <button onClick={handleAssign}>Asignar</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RecipeDetail;
