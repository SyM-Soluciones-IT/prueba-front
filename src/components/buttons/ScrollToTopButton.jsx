import React, { useState, useEffect } from 'react';
import { FaAngleUp } from "react-icons/fa6";
import './ScrollToTopButton.css';

const ScrollToTopButton = ({ smoothScrollingEnabled }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para mostrar u ocultar el botón basado en la posición de desplazamiento
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Agrega un listener de scroll para llamar a toggleVisibility cuando el usuario se desplaza
    window.addEventListener('scroll', toggleVisibility);

    // Limpia el listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (smoothScrollingEnabled) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className={isVisible ? "scroll-to-top-button show" : "scroll-to-top-button"}
      onClick={scrollToTop}
    >
      <FaAngleUp />
    </div>
  );
};

export default ScrollToTopButton;
