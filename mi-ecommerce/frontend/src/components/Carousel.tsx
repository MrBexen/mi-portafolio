import { useState } from "react";
import "./Carousel.css";

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
}

function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanzar a la siguiente diapositiva
  const nextSlide = () => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % slides.length);
  };

  // Regresar a la diapositiva anterior
  const previousSlide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? slides.length - 1 : previousIndex - 1,
    );
  };

  // Evitar errores si no existen diapositivas
  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  return (
    <section className="carousel">
      <div className="carousel-container">
        {/* Imagen de la diapositiva actual */}
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="carousel-image"
        />

        {/* Capa oscura para mejorar la lectura del texto */}
        <div className="carousel-overlay"></div>

        {/* Información de la diapositiva */}
        <div className="carousel-content">
          <h2>{currentSlide.title}</h2>

          <p>{currentSlide.description}</p>

          <button type="button" className="carousel-button">
            Ver más →
          </button>
        </div>

        {/* Botón anterior */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Slide anterior"
          className="carousel-arrow carousel-arrow-left"
        >
          ‹
        </button>

        {/* Botón siguiente */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="carousel-arrow carousel-arrow-right"
        >
          ›
        </button>

        {/* Indicadores de diapositivas */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-pressed={index === currentIndex}
              className={`carousel-indicator ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
