import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/C" element={<Catalogo />} />
    </Routes>
  );
}

export default App;
