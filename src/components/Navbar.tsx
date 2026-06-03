import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <span>CookPlanner</span>
      <Link to="/">Recetas</Link>
      <Link to="/planner">Planificador</Link>
    </nav>
  );
}

export default Navbar;
