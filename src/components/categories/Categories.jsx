import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/services';
import './Categories.css'; // Importa tus estilos CSS aquí

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        categoriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container className='d-flex justify-content-center'>
      <div className="d-flex flex-wrap justify-content-center">
        {categories.map(category => (
          <div key={category._id} className="col-xl-2 col-lg-2 col-md-4 col-sm-6 m-3 d-flex align-content-center border-0 flex-column flex-wrap" style={{minWidth: '200px'}}>
              <div className='div-category' style={{ width: 'fit-content'}}>
                <Link to={`/nuestros-vehiculos/${category.name.toLowerCase().replace(/ /g, '-')}`} className="category-link">
                  <img src={category.image} loading="lazy" alt={category.name} className="category-image" />
                </Link>
              </div>
              <div className='div-category' style={{ alignSelf: 'center', width: 'fit-content'}}>
                <Link to={`/nuestros-vehiculos/${category.name.toLowerCase().replace(/ /g, '-')}`} className="category-link">
                  <span className="category-title">{category.name}</span>
                </Link>
              </div>
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Categories;