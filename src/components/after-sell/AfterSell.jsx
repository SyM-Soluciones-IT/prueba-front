import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { RiWhatsappLine, RiMailLine, RiPhoneLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AFTER_SELL_TEXT } from "../contentText/ContentText";
import "./AfterSell.css";

const AfterSell = ({isHome=false}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();

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
  },  []);
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // 100 milliseconds delay
  }

  return (
    <div className="contenedor">
        <h2 className={isHome ? "principal-titulo-home" : "principal-titulo-seccion"}>{AFTER_SELL_TEXT.title}</h2>
        <div className="intro-repuestos">
          <p className="repuestos-texto">{AFTER_SELL_TEXT.content}</p>
          <p className="repuestos-texto">{AFTER_SELL_TEXT.content2}</p>
        </div>
      <div className="contenedor-top">
          <Card className="tarjeta">
          <Card.Title className="tarjeta-titulo">Garantía</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img variant="bottom" className="imagen-repuestos" src="https://i.ibb.co/6RT7p3Y/foton-garantia.jpg" />
              <Card.Text className="tarjeta-texto" >
                Nuestros vehículos cuentan con una garantía de 100.000kms o 3 años lo que suceda primero.
              </Card.Text>
            </Card.Body>
          </Card>
        <Card className="tarjeta">
          <Card.Title className="tarjeta-titulo">Repuestos</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img className="imagen-repuestos" variant="bottom" src="https://i.ibb.co/5xnhKH5/repuestos-originales.jpg" />
              <Card.Text className="tarjeta-texto" >
                En Bahia Mobility todos los repuestos son originales, garantizando así que tu vehículo siempre esté en perfecto estado.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      <div className="contenedor-top">
        <Card className="tarjeta">
            <Card.Title className="tarjeta-titulo">Asistencia Técnica</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img className="imagen-repuestos" variant="bottom" src="https://i.ibb.co/MRnW92H/mecanico.jpg" />
              <Card.Text className="tarjeta-texto">
              Contamos con un equipo de profesionales técnicos para solucionar cualquier duda o consulta. Cualquier información puede enviarlo a través de nuestro formulario de contacto, por WhatsApp o al número del taller.
              </Card.Text>
              <Button
                variant="primary"
                className="mt-3 btn-secondary"
                onClick={handleShowModal}
              >
                {AFTER_SELL_TEXT.buttonText}
              </Button>
            </Card.Body>
          </Card>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione una opción de contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center d-flex flex-column">
          <Button
            variant="primary"
            className="mb-2 btn-primary"
            onClick={() => {
              const mensaje = encodeURIComponent(
                `Hola, quiero solicitar turno para el taller`
              );
              window.open(`https://wa.me/+5492916446200/?text=${mensaje}`);
            }}
          >
            <RiWhatsappLine className="mr-1" /> Solicitar turno por WhatsApp
          </Button>
          <Button
            variant="primary"
            className="mb-2 btn-primary"
            onClick={() => {
              navigate(
                `/contacto?asunto=Consulta`
              );
              scrollToTop();
            }}
          >
            <RiMailLine className="mb-1 " /> Solicitar turno por Correo
          </Button>
          <Button
            variant="primary"
            className="btn-primary"
            onClick={() => {
              window.location.href = `tel:+123456789`; // Replace with the actual phone number
            }}
          >
            <RiPhoneLine className="mr-1" /> Llamar al Taller
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AfterSell;
