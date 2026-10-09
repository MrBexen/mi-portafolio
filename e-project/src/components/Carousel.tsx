import { useState } from "react";

/*
  Definimos qué información necesita cada slide.

  image       → ruta de la imagen
  title       → título que aparecerá encima
  description → texto descriptivo
*/
interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

/*
  Definimos las Props que recibirá nuestro componente.

  El Carousel no necesita saber qué proyectos existen.
  Simplemente recibe una lista de slides y se encarga
  de mostrarlos.
*/
interface CarouselProps {
  slides: CarouselSlide[];
}

function Carousel({ slides }: CarouselProps) {
  /*
    currentIndex guarda cuál slide estamos mostrando.

    Por ejemplo:

    0 → primer slide
    1 → segundo slide
    2 → tercer slide

    useState(0) significa que comenzamos mostrando
    el primer elemento.
  */
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
    Función para avanzar al siguiente slide.

    El operador % nos permite volver al principio
    cuando llegamos al final.

    Ejemplo con 3 slides:

    0 → 1
    1 → 2
    2 → 0
  */
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  /*
    Función para volver al slide anterior.

    Si estamos en el primero (0), volvemos al último.
  */
  const previousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  /*
    Obtenemos el slide que debemos mostrar actualmente.

    Si currentIndex es 1:

    slides[1]

    será el segundo slide.
  */
  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full max-w-5xl mx-auto">
      {/* 
        CONTENEDOR PRINCIPAL DEL CARRUSEL

        relative:
        permite posicionar las flechas y el texto
        encima de la imagen.

        overflow-hidden:
        evita que partes de la imagen sobresalgan.

        rounded-2xl:
        bordes redondeados.

        shadow-2xl:
        sombra alrededor del carrusel.
      */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* 
          IMAGEN

          w-full:
          ocupa todo el ancho.

          h-[500px]:
          definimos una altura fija.

          object-cover:
          hace que la imagen cubra todo el espacio
          sin deformarse.

          transition-transform:
          permite animar transformaciones.

          hover:scale-105:
          cuando pasamos el mouse, la imagen
          aumenta ligeramente de tamaño.
        */}
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="
            w-full
            h-[500px]
            object-cover
            transition-transform
            duration-700
            hover:scale-105
          "
        />

        {/* 
          DEGRADADO

          Este elemento está encima de la imagen.

          pointer-events-none:
          hace que el mouse ignore este elemento,
          permitiendo seguir interactuando con
          botones que estén debajo/encima.
        */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
            pointer-events-none
          "
        />

        {/* 
          TEXTO SOBRE LA IMAGEN

          absolute:
          permite colocar el contenido encima
          de la imagen.

          bottom-0:
          lo posiciona desde abajo.

          p-8:
          agrega espacio interior.
        */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-8
            text-white
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {currentSlide.title}
          </h2>

          <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-5">
            {currentSlide.description}
          </p>

          {/* 
            Este botón puede convertirse posteriormente
            en un Link de React Router.

            Por ahora simplemente es visual.
          */}
          <button
            type="button"
            className="
              px-5
              py-2.5
              rounded-lg
              bg-white
              text-gray-900
              font-semibold
              transition
              hover:bg-gray-200
              hover:scale-105
            "
          >
            Ver más →
          </button>
        </div>

        {/* 
          BOTÓN ANTERIOR
        */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Slide anterior"
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-black/40
            text-white
            text-2xl
            backdrop-blur-sm
            transition
            hover:bg-black/70
            hover:scale-110
          "
        >
          ‹
        </button>

        {/* 
          BOTÓN SIGUIENTE
        */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-black/40
            text-white
            text-2xl
            backdrop-blur-sm
            transition
            hover:bg-black/70
            hover:scale-110
          "
        >
          ›
        </button>

        {/* 
          INDICADORES

          Por cada slide creamos un pequeño botón.

          Si estamos viendo el slide actual,
          cambiamos su apariencia.
        */}
        <div
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            flex
            gap-2
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
