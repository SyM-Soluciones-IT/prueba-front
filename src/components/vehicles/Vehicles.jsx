import React, { useState, useEffect } from "react";
import { Navbar, Nav, Modal, Button, Carousel, Spinner } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getVehicles, getCategories } from "../../services/services";
import "./Vehicles.css";

const Vehicles = ({ onSectionChange, selectedSection }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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
    const pathname = decodeURIComponent(location.pathname.toLowerCase());
    const capitalizedCategory = pathname.split("/")[2].replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setCategory(capitalizedCategory);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        try {
          setLoading(true);
          const vehiclesData = await getVehicles(category);
          setVehicles(vehiclesData);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
    resetPagination();
    updateSelectedSection();
  }, [category]);

  const updateSelectedSection = () => {
    const pathname = decodeURIComponent(location.pathname.toLowerCase());
    const capitalizedCategory = pathname.split("/")[2].replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    onSectionChange(capitalizedCategory);
  };

  const handleToggleClick = () => setIsNavExpanded(!isNavExpanded);

  const handleSectionClick = (section) => {
    onSectionChange(section);
    if (window.innerWidth <= 992) handleToggleClick();
  };

  const handleCotizarClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(!showModal);
  };

  const handleCloseModal = () => setShowModal(!showModal);

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetPagination = () => setCurrentPage(1);

  return (
    <div className="container contenedor text-center d-flex flex-column align-items-center">
      <div className="contenedor-titulo-categoria">
        <h2 className="principal-titulo-seccion" style={{ marginBottom: "0" }}>{category}</h2>
      </div>
      <div className="contenedor-descripcion-seccion">
        <p className="descripcion-seccion">{categories.find((cat) => cat.name === category)?.description}</p>
      </div>
      <div className="container-categorias" style={{ backgroundColor: "#101010", color: "white", width: "100vw" }}>
        <Navbar expand="lg" className="nav-dropdown-mobile" style={{backgroundColor: "#101010", color: "white", width: "100%", border: "transparent" }} expanded={isNavExpanded} onToggle={handleToggleClick}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="nav-categorias">
            <Nav className="mr-auto navbar-categorias">
              {categories.map((cat) => (
                <Nav.Link key={cat._id} className="nav-link-categorias" as={Link} to={`/nuestros-vehiculos/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ backgroundColor: selectedSection === cat.name ? "#ca213b" : "#101010", color: "white", fontWeight: "bold", fontSize: "1.2em", borderRadius: "0.5rem" }} onClick={() => handleSectionClick(cat.name)}>{cat.name}</Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {loading && (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <div className="row" style={{ marginTop: "1em", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {currentVehicles.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 mb-4" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <div className="card-productos" style={{ marginTop: "10px", width: "300px" }}>
                <Carousel style={{ borderBottom: "1px solid #101010", height: "250px"}} interval={null} controls={vehicle.image.length > 1 || vehicle.video.length > 0}>
                  {vehicle.image.map((image, index) => (
                    <Carousel.Item className="img-auto" key={index}>
                      <img className="d-block w-100 image-card img-fluid" loading="lazy" style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} src={image} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                  {vehicle.video.length > 0 && vehicle.video.map((video, index) => (
                    <Carousel.Item className="img-auto" key={index}>
                      <iframe className="img-auto" loading="lazy" src={video} title={`Video ${index}`} allowFullScreen border="transparent" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="card-body-productos">
                  <h5 className="card-title" style={{ width: "100%", fontWeight: "bold", borderBottom: "1px solid #101010" }}>{vehicle.name}</h5>
                  {["engine", "power", "gearbox", "load"].map((field) => (
                    <p key={field} className="card-text" style={{ textAlign: "center" }}>
                      <strong>{field === "engine" ? "Motor" : field === "power" ? "Potencia" : field === "gearbox" ? "Transmisión" : "PBT"}:</strong> {vehicle[field]}
                    </p>
                  ))}
                  {vehicle.datasheet && vehicle.datasheet !== "" && (
                    <a href={vehicle.datasheet} target="_self" rel="noopener noreferrer" className="btn btn-primary">Descargar Ficha Técnica</a>
                  )}
                  <button className="btn btn-primary" style={{ width: "fit-content" }} onClick={() => handleCotizarClick(vehicle)}>Cotiza Aquí</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(vehicles.length / vehiclesPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button onClick={() => { paginate(i + 1); setTimeout(() => { window.scrollTo(0, 0); }, 100); }} className="page-link">{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cotizar Vehiculo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVehicle && <p>Elija una opción para cotizar el producto {selectedVehicle.name}:</p>}
            <Button variant="primary" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={() => { const mensaje = encodeURIComponent(`Hola, quiero cotizar el producto ${selectedVehicle.name}`); window.open(`https://wa.me/+5492916446200/?text=${mensaje}`); }}>Cotizar por WhatsApp</Button>{" "}
            <Button variant="primary" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={() => { navigate(`/contacto?asunto=Cotizacion ${encodeURIComponent(selectedVehicle.name)}`); setTimeout(() => { window.scrollTo(0, 0); }, 100); }}>Cotizar por Mail</Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Vehicles;
