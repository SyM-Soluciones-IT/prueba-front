import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { subscribeToNewsletter } from "../../services/services"; // Importa la función de API
import "./Footer.css"; // Estilo personalizado para el footer

const Footer = () => {
  // Define el esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await subscribeToNewsletter(values.email); // Utiliza la función de API para suscribirse al newsletter
      alert("¡Gracias por suscribirte a nuestro newsletter!");
      resetForm();
    } catch (error) {
      console.error("Error al suscribirse al newsletter:", error);
      alert("Hubo un error al suscribirse al newsletter. Por favor, intenta nuevamente más tarde.");
    }
    setSubmitting(false);
  };

  return (
    <footer className="footer">
      <Row>
        <Col xs={12} sm={6} md={3}>
          <h5>Información</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/nosotros">Acerca de nosotros</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <h5>Redes Sociales</h5>
          <div className="social-icons">
            <a
              className="youtube"
              href="https://www.youtube.com/@bahiamobility-Camiones/featured"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              className="instagram"
              href="https://www.instagram.com/bahiamobility/?hl=es-la"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram />
            </a>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>Enterate las novedades</h5>
          {/* Utiliza Formik para manejar el formulario */}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" required />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
                <button type="submit" disabled={isSubmitting}>
                  Suscríbete
                </button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <h5>Contacto</h5>
          <p>
            Hipólito Yrigoyen 3871, B8000 Bahía Blanca, Provincia de Buenos
            Aires
          </p>
          <p>Email: ventas@fotonbahia.com.ar</p>
          <p>Teléfono: 0291 446-0146</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12}>
          <p className="text-center">
            © 2024 SyM Soluciones IT. Todos los derechos reservados.
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
