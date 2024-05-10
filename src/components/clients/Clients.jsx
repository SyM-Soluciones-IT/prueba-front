import React, { useState, useEffect } from 'react';
import Slider from 'react-infinite-logo-slider';
import axios from 'axios';
import { Card, CardImg, CardBody } from 'react-bootstrap'; // Importa componentes de tarjeta de Reactstrap o la librería que estés utilizando
import '../brands/Brands.css';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  return (
    <div className='container'>
      <Slider
        autoWidth={true}
        maxWidth={1000}
        duration={20}
        pauseOnHover={true}
        blurBorders={false}
        className="centered-slider"
        infinite={true}
      >
        {clientes.map(cliente => (
          <Slider.Slide key={cliente._id} className="centered-slide">
            <Card className="image-card"  >
              <CardBody className="image-card-body" >
                <CardImg src={cliente.image} alt={cliente.name} className="card-img" />
              </CardBody>
            </Card>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
};

export default ClientesList;
