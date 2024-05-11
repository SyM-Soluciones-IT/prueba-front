import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { sendEmail } from '../../services/services';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const ContactForm = ({isHome=false}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [asunto, setAsunto] = useState('');

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const asunto = params.get('asunto');
    if (asunto) {
      setAsunto(asunto);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(name, email, message, asunto);
      Swal.fire({
        icon: 'success',
        title: 'Email enviado exitosamente!',
        text: 'Gracias por contactarnos!',
      })
      setName('');
      setAsunto('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al enviar el correo.',
      })
    }
  };

  return (
    <div >
      <h2 className={isHome ? "principal-titulo-home" : "principal-titulo-seccion"}>Contacto</h2>
      <Container>
      <Form onSubmit={handleSubmit} className="mt-4 p-4 border rounded" style={{backgroundColor: "#da1d27", display: "flex", flexDirection: "column"}}>
        <Form.Group controlId="formName">
          <Form.Label style={{color: "white"}}>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su nombre" required value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label style={{color: "white"}}>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingrese su correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formAsunto">
          <Form.Label style={{color: "white"}}>Asunto</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el asunto" required value={asunto} onChange={(e) => setAsunto(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label style={{color: "white"}}>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Ingrese su mensaje" required value={message} onChange={(e) => setMessage(e.target.value)} />
        </Form.Group>
        <Button variant="secondary" type="submit" className="align-self-center mt-2">Enviar</Button>
      </Form>
      </Container>
    </div>
  );
};

export default ContactForm;
