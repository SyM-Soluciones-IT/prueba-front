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
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
        categoriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categoriesData);

        const pathname = decodeURIComponent(location.pathname.toLowerCase());
        const capitalizedCategory = pathname.split("/")[2].replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setCategory(capitalizedCategory);

        if (capitalizedCategory) {
          const storedVehiclesJSON = localStorage.getItem("vehicles");
          const storedVehicles = storedVehiclesJSON ? JSON.parse(storedVehiclesJSON) : {};

          if (storedVehicles[capitalizedCategory]) {
            const vehiclesData = storedVehicles[capitalizedCategory];
            setVehicles(vehiclesData);
          } else {
            const vehiclesData = await getVehicles(capitalizedCategory);

            // Fetch the datasheet URLs
            const filesResponse = await fetch('https://penamatias.alwaysdata.net/api/files');
            const filesData = await filesResponse.json();

            const updatedVehicles = vehiclesData.map(vehicle => {
              const vehicleNameFormatted = vehicle.name.replace(/\s+/g, '-');
              console.log(vehicleNameFormatted);
              const matchingFile = filesData.find(fileUrl => fileUrl.includes(vehicleNameFormatted));
              if (matchingFile) {
                vehicle.datasheet = `https://penamatias.alwaysdata.net/api/download/${vehicleNameFormatted}.pdf`;
              }
              return vehicle;
            });

            setVehicles(updatedVehicles);
            localStorage.setItem("vehicles", JSON.stringify({
              ...storedVehicles,
              [capitalizedCategory]: updatedVehicles,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    resetPagination();
    updateSelectedSection();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Add event listener for window load event
  useEffect(() => {
    window.addEventListener("load", () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top when the page loads
    });
    localStorage.clear();
    return () => {
      window.removeEventListener("load", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };
  }, []);

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
    <div className="contenedor text-center d-flex flex-column align-items-center">
      {loading && (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      )}
      {!loading && category && (
        <>
          <h2 className="principal-titulo-seccion">{category}</h2>
          <div className="contenedor-descripcion-seccion">
            <p className="descripcion-seccion">{categories.find((cat) => cat.name === category)?.description}</p>
          </div>
          <div className="container-categorias">
            <Navbar expand="lg" className="nav-dropdown-mobile" expanded={isNavExpanded} onToggle={handleToggleClick}>
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
          <div className="row div-row">
            {currentVehicles.map((vehicle) => (
              <div key={vehicle._id} className="mb-4 div-vehiculos">
                <div className="card-productos" >
                  <Carousel className="carousel-vehiculos" interval={null} controls={vehicle.image.length > 1 || vehicle.video.length > 0}>
                    {vehicle.image.map((image, index) => (
                      <Carousel.Item className="img-auto" key={index}>
                        <img className="d-block w-100 image-card img-fluid" loading="lazy" src={image} alt={`Slide ${index}`} />
                      </Carousel.Item>
                    ))}
                    {vehicle.video.length > 0 && vehicle.video.map((video, index) => (
                      <Carousel.Item className="img-auto" key={index}>
                        <iframe className="img-auto iframe-vehiculos" loading="lazy" src={video} title={`Video ${index}`} allowFullScreen border="transparent"/>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="card-body-productos">
                    <h5 className="card-title-vehicles">{vehicle.name}</h5>
                    {["engine", "power", "gearbox", "load"].map((field) => (
                      <p key={field} className="card-text" >
                        <strong>{field === "engine" ? "Motor" : field === "power" ? "Potencia" : field === "gearbox" ? "Transmisión" : "PBT"}:</strong> {vehicle[field]}
                      </p>
                    ))}
                    {vehicle.datasheet && vehicle.datasheet !== "" && (
                      <a href={vehicle.datasheet} target="_self" rel="noopener noreferrer" className="btn mb-2 btn-primary">Ficha Técnica</a>
                    )}
                    <button className="btn mb-2 btn-primary"  onClick={() => handleCotizarClick(vehicle)}>Cotiza Aquí</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <Button className="btn-primary mb-2"  onClick={() => { const mensaje = encodeURIComponent(`Hola, quiero cotizar el producto ${selectedVehicle.name}`); window.open(`https://wa.me/+5492916446200/?text=${mensaje}`); }}>Cotizar por WhatsApp</Button>{" "}
                <Button className="btn-primary"  onClick={() => { navigate(`/contacto?asunto=Cotizacion ${encodeURIComponent(selectedVehicle.name)}`); setTimeout(() => { window.scrollTo(0, 0); }, 100); }}>Cotizar por Mail</Button>
              </Modal.Body>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Vehicles;
