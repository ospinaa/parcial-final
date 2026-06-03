import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  prepTimeMinutes: number;
  caloriesPerServing: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div>
      <img src={recipe.image} alt={recipe.name} width={200} />
      <h3>{recipe.name}</h3>
      <p>{recipe.cuisine} - {recipe.mealType?.join(", ")}</p>
      <p>Dificultad: {recipe.difficulty}</p>
      <p>Prep: {recipe.prepTimeMinutes} min | {recipe.caloriesPerServing} kcal</p>
      <Link to={`/recipe/${recipe.id}`}>Ver receta</Link>
    </div>
  );
}

export default RecipeCard;
