import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Carousel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { getUseds } from "../../services/services";
import "./Useds.css";
import { USEDS_TEXT } from "../contentText/ContentText";

const Useds = ({ onSectionChange, selectedSection }) => {
  const [useds, setUseds] = useState([]);
  const [selectedUsed, setSelectedUsed] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Estado y constantes para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usedsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usedsData = await getUseds();
        setUseds(usedsData);
      } catch (error) {
        console.error("Error fetching usados:", error);
      } finally {
        setLoading(false); // Ocultar el spinner después de la carga de datos
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Add event listener for window load event
  useEffect(() => {
    window.addEventListener("load", () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top when the page loads
    });
    return () => {
      window.removeEventListener("load", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };
  }, []);

  const handleToggleClick = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleSectionClick = (section) => {
    onSectionChange(section);
    if (window.innerWidth <= 992) {
      handleToggleClick();
    }
  };

  const handleCotizarClick = (usado) => {
    setSelectedUsed(usado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Paginación
  const indexOfLastUsed = currentPage * usedsPerPage;
  const indexOfFirstUsed = indexOfLastUsed - usedsPerPage;
  const currentUseds = useds.slice(indexOfFirstUsed, indexOfLastUsed);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="principal-titulo-seccion">{USEDS_TEXT.title}</h2>
      <div className="separador">
        <p className="repuestos-texto">{USEDS_TEXT.description}</p>
      </div>
      {loading && (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <div className="row div-row">
          {currentUseds.map((used) => (
            <div key={used._id} className="col-md-4 mb-4 div-vehiculos">
              <div className="card-productos">
                <Carousel
                  className="carousel-vehiculos"
                  interval={null}
                  controls={used.image.length > 1 || used.video.length > 0}
                >
                  {used.image.map((image, index) => (
                    <Carousel.Item className="img-auto" key={index}>
                      <img
                        className="d-block w-100 image-card img-fluid"
                        loading="lazy"
                        src={image}
                        alt={`Slide ${index}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="card-body-productos">
                  <h5 className="card-title-vehicles">{used.name}</h5>
                  {["engine", "power", "gearbox", "load", "year"].map((field) => (
                    <p key={field} className="card-text">
                      <strong>{field === "engine" ? "Motor" : field === "power" ? "Potencia" : field === "gearbox" ? "Transmisión" : field === "load" ? "PBT" : "Año"}:</strong> {used[field]}
                    </p>
                  ))}
                  {used.datasheet && used.datasheet !== "" && (
                    <a href={used.datasheet} target="_self" rel="noopener noreferrer" className="btn">Descargar Ficha Técnica</a>
                  )}
                  <button className="btn mb-2 btn-primary" onClick={() => handleCotizarClick(used)}>Cotiza Aquí</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(useds.length / usedsPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button
                onClick={() => {
                  paginate(i + 1);
                  setTimeout(() => { window.scrollTo(0, 0); }, 100);
                }}
                className="page-link"
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cotizar Usado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUsed && (
              <p>Elija una opción para cotizar el usado {selectedUsed.name}:</p>
            )}
            <Button
              className="btn-primary mb-2"
              onClick={() => {
                const mensaje = encodeURIComponent(
                  `Hola, quiero cotizar el usado ${selectedUsed.name}`
                );
                window.open(`https://wa.me/+5492916446200/?text=${mensaje}`);
              }}
            >
              Cotizar por WhatsApp
            </Button>{" "}
            <Button
              className="btn-primary mb-2"
              onClick={() => {
                navigate(
                  `/contacto?asunto=Cotizacion ${encodeURIComponent(
                    selectedUsed.name
                  )}`
                );
              }}
            >
              Cotizar por Mail
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Useds;
