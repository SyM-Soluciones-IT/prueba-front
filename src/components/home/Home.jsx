// En el componente Home.js
import React from 'react';
import CategoriaList from '../categories/Categories';
import RepuestosList from '../after-sell/AfterSell';
import ContactForm from '../contact/Contact';
import MarcaList from '../brands/Brands'; // Importa el componente MarcaList
import ClientesList from '../clients/Clients';
import About from '../about/About';
import { HOME_TEXT } from '../contentText/ContentText';
import './Home.css';

const Home = ({isHome=true}) => {
  return (
    <div className='div-principal-home'>
      <section className="principal">
        <h2 className="principal-titulo-seccion">Foton en Bahia Blanca y la zona</h2>
        <div className='container'>
          <p className="principal-texto-home">{HOME_TEXT.content}</p>
        </div>
      </section>
      <img className='img-home' src="https://i.ibb.co/RhDkQYZ/concesionaria-h-img.jpg" alt="Imagen de la concesionaria"/>
      <section id="productos">
        <h2 className="principal-titulo-home">Nuestros Vehiculos</h2>
        <CategoriaList />
      </section>
      <section id="marcas"> {/* Agrega una sección para mostrar las marcas */}
        <h2 className="principal-titulo-home-marcas">Marcas</h2>
        <MarcaList /> {/* Agrega el componente MarcaList */}
      </section>
      <section id="repuestos">
      <RepuestosList isHome={isHome}/>
      </section>
      <section id="clientes"> {/* Agrega una sección para mostrar las marcas */}
        <h2 className="principal-titulo-home">Clientes</h2>
        <ClientesList /> {/* Agrega el componente MarcaList */}
      </section>
      <section id="contacto">
        <ContactForm isHome={isHome}/>
      </section>
    </div>
  );
};

export default Home;
