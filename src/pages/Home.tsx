import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

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

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar recetas");
        return res.json();
      })
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Cargando recetas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Recetas</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No se encontraron recetas.</p>
      ) : (
        <div>
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
