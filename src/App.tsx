import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlannerProvider } from "./context/PlannerContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Planner from "./pages/Planner";

function App() {
  return (
    <PlannerProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </BrowserRouter>
    </PlannerProvider>
  );
}

export default App;
