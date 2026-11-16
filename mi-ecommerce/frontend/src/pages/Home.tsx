import proyecto1 from "../assets/images/proyecto1.jpg";
import proyecto2 from "../assets/images/proyecto2.jpg";
import proyecto3 from "../assets/images/proyecto3.jpg";
import Carousel from "../components/Carousel";

import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const slides = [
    {
      image: proyecto1,
      title: "Maquetas",
      description: "Gundam, Kamen Rider, Dragon Ball, etc.",
    },
    {
      image: proyecto2,
      title: "Herramientas",
      description: "Dale forma a tus proyectos y mejora los resultados",
    },
    {
      image: proyecto3,
      title: "Figuras de colección",
      description: "Llena tu estantería con emoción pura",
    },
  ];

  return (
    <div className="home-page">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="home-main">
        <h1 className="home-title">Bienvenido</h1>
        <Carousel slides={slides} />
      </main>
    </div>
  );
}
