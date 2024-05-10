//App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Categories from "./components/categories/Categories";
import Vehicles from "./components/vehicles/Vehicles";
import SpareParts from "./components/after-sell/AfterSell";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Useds from "./components/useds/Useds";
import ScrollToTopButton from "./components/buttons/ScrollToTopButton"; 
import WhatsAppButton from './components/buttons/WhatsAppButton'; // Importa el componente WhatsAppButton
import './App.css';

const App = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [smoothScrollingEnabled, setSmoothScrollingEnabled] = useState(true);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <Router>
      <div>
        <Header
          onSectionChange={handleSectionChange}
          selectedSection={selectedSection}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/nuestros-vehiculos" element={<Categories />} />
          <Route
            exact
            path="/nuestros-vehiculos/:categoria"
            element={
              <Vehicles
                onSectionChange={handleSectionChange}
                selectedSection={selectedSection}
              />
            }
          />
          <Route exact path="/post-venta" element={<SpareParts />} />
          <Route
            exact
            path="/usados"
            element={
              <Useds
                onSectionChange={handleSectionChange}
                selectedSection={selectedSection}
              />
            }
          />
          <Route exact path="/contacto" element={<Contact />} />
          <Route exact path="/nosotros" element={<About />} />
        </Routes>
        <ScrollToTopButton smoothScrollingEnabled={smoothScrollingEnabled} /> {/* Pasa la variable de estado como prop */}
        <WhatsAppButton /> 
        <Footer />
      </div>
    </Router>
  );
};
export default App;
