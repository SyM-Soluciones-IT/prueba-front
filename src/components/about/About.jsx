import React from "react";
import "./About.css"; // Archivo CSS para los estilos específicos del componente
import { ABOUT_TEXT } from "../contentText/ContentText"; // Importa las constantes de texto

const { title, image, historyContent, historyImage } = ABOUT_TEXT;

const About = ({isHome=false}) => {
  return (
    <section id="about" >
      <h2 className={isHome ? "principal-titulo-home" : "principal-titulo-seccion"}>{title}</h2>
      <div className="contenedor-dos" >
        <div className="sub-contenedor-2">
          <p className="principal-texto-2" >
            {historyContent}
          </p>
        </div>
        <img src={historyImage} alt="Imagen de camiones" style={{ width:"100%", minHeight: "220px", maxHeight: "400px", objectFit: "cover"}}/>
      </div>
      <div className="contenedor-uno">
        <h3>Encontranos en</h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.290558503613!2d-62.23512012337604!3d-38.688169522108375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eda5c22e425b35%3A0xe89775cadeb93e1!2sBah%C3%ADa%20Mobility!5e0!3m2!1sen!2sar!4v1713557673176!5m2!1sen!2sar" height="450" style={{border: "0", width : "100%"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <img src={image} alt="Imagen de camiones" style={{width: "100vw", minHeight: "220px", objectFit: "cover", marginTop: "1em"}}/>
      </div>
    </section>
  );
};

export default About;
