import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody } from 'react-bootstrap';
import './Brands.css';

const MarcaList = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    obtenerMarcas();
  }, []);

  const obtenerMarcas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/marcas');
      setMarcas(response.data);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  return (
      <div className="marca-list">
        {marcas.map(marca => (
          <div key={marca._id} className="marca-item">
            <Card className="image-card">
              <CardBody className="image-card-body">
                <CardImg src={marca.image} alt={marca.name} className="card-img" />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
  );
};

export default MarcaList;
