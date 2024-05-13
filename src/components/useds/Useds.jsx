import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
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
  }, [location]);

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

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="principal-titulo-seccion">{USEDS_TEXT.title}</h2>
      <div className="separador">
        <p className="repuestos-texto">{USEDS_TEXT.description}</p>
        <p className="repuestos-texto">{USEDS_TEXT.description2}</p>
      </div>
      {loading && (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      )}
      {!loading && (
      <div className="row d-flex justify-content-center">
        {useds.map((used) => (
          <div key={used._id} className="col-md-4 mb-4">
          <div className="card-used">
            <img className="card-img-top" src={used.image} alt={used.name} />
            <div className="card-body body-used">
              <h5 className="card-title title-used">{used.name}</h5>
              <p className="card-text text-used">{used.description}</p>
              <p className="card-text text-used">
                <strong>Specs:</strong> {used.specs}
              </p>
              <p className="card-text text-used">
                <strong>Year:</strong> {used.year || "No especificado"}
              </p>
              <button
                className="btn-primary"
                onClick={() => handleCotizarClick(used)}
              >
                Cotiza aquí
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
      )}
      {/* Modal aquí */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cotizar Usado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUsed && (
              <p>
                Elija una opción para cotizar el usado {selectedUsed.name}:
              </p>
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
