import React, { useState } from "react";
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

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // 100 milliseconds delay
  }

  return (
    <div className="contenedor" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 className={isHome ? "principal-titulo-home" : "principal-titulo-seccion"}>{AFTER_SELL_TEXT.title}</h2>
        <div className="intro-repuestos" style={{ width: "80%"}}>
          <p className="repuestos-texto">{AFTER_SELL_TEXT.content}</p>
          <p className="repuestos-texto">{AFTER_SELL_TEXT.content2}</p>
        </div>
      <div className="contenedor-top">
          <Card className="tarjeta">
          <Card.Title style={{ textAlign: "center" , fontSize: "1.5em", fontWeight: "bold"}}>Garantía</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img variant="bottom" className="imagen-repuestos" style={{ width: "300px", height: "350px"}} src="https://i.ibb.co/ZNYYxQb/images.jpg" />
              <Card.Text style={{marginTop: ".7em", minHeight: "100px", display: "flex", alignItems: "center", fontSize: "1.5em"}}>
                Nuestros vehículos cuentan con una garantía de 100.000kms o 3 años lo que suceda primero.
              </Card.Text>
            </Card.Body>
          </Card>
        <Card className="tarjeta">
          <Card.Title style={{ textAlign: "center" , fontSize: "1.5em", fontWeight: "bold"}}>Repuestos</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img className="imagen-repuestos" variant="bottom" style={{ width: "300px", height: "350px" }} src="https://i.ibb.co/5xnhKH5/repuestos-originales.jpg" />
              <Card.Text style={{marginTop: ".7em", minHeight: "100px", display: "flex", alignItems: "center", fontSize: "1.5em"}}>
                En Bahia Mobility todos los repuestos son originales, garantizando así que tu vehículo siempre esté en perfecto estado.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
      <div className="contenedor-top">
        <Card className="tarjeta">
            <Card.Title style={{ textAlign: "center" , fontSize: "1.5em", fontWeight: "bold", marginTop: "1em"}}>Asistencia Técnica</Card.Title>
            <Card.Body className="text-center tarjeta-body">
              <Card.Img className="imagen-repuestos" variant="bottom" style={{ width: "300px",height: "350px" }} src="https://i.ibb.co/mzVTrnQ/2024-03-13.jpg" />
              <Card.Text style={{marginTop: ".7em",  minHeight: "100px", display: "flex", alignItems: "center", fontSize: "1.5em"}}>
              Contamos con un equipo de profesionales técnicos para solucionar cualquier duda o consulta. Cualquier información puede enviarlo a través de nuestro formulario de contacto, por WhatsApp o al número del taller.
              </Card.Text>
              <Button
                variant="primary"
                className="mr-2"
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
            className="mr-2"
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
            className="mr-2"
            onClick={() => {
              navigate(
                `/contacto?asunto=Consulta`
              );
              scrollToTop();
            }}
          >
            <RiMailLine className="mr-1" /> Solicitar turno por Correo
          </Button>
          <Button
            variant="primary"
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
