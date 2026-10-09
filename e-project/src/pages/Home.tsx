//la primera pagina que se ve al entrar

import Carousel from "../components/Carousel";
import proyecto1 from "../assets/images/proyecto1.jpg";
import proyecto2 from "../assets/images/proyecto2.jpg";
import proyecto3 from "../assets/images/proyecto3.jpg";
import Navbar from "../components/Navbar";

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
    // Cambiamos justify-center por min-h-screen flex flex-col bg-white
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. El Navbar ahora ocupa todo el ancho arriba de forma natural */}
      <Navbar />

      {/* 2. El contenido centralizado se maneja dentro de este contenedor */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-6">
        <h1 className="text-5xl font-bold text-slate-800">Bienvenido</h1>
        <Carousel slides={slides} />
      </main>
    </div>
  );
}
