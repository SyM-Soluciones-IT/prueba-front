import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"; // Asegúrate de importar correctamente SweetAlert2
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
      Swal.fire({
        icon: "success",
        title: "¡Suscripción exitosa!",
        text: "Gracias por suscribirse a nuestro newsletter.",
      });
      resetForm();
    } catch (error) {
      console.error("Error al suscribirse al newsletter:", error);
      let errorMessage = "Hubo un error al suscribirse al newsletter. Por favor, intenta nuevamente más tarde.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      Swal.fire({
        icon: "error",
        title: "Error al suscribirse al newsletter",
        text: errorMessage,
      });
    }
    setSubmitting(false);
  };

  return (
    <footer className="footer">
      <div className="col-xs-12 col-sm-6 col-md-3 footer-about">
        <h5>Información</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/nosotros">Acerca de nosotros</a>
          </li>
          <li>
            <a href="#">Política de privacidad</a>
          </li>
        </ul>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3 footer-redes">
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
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3 footer-col">
        <h5>Entérate de las novedades</h5>
        {/* Utiliza Formik para manejar el formulario */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="Email" required />
              <button type="submit" disabled={isSubmitting}>
                Suscríbete
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3 footer-contact">
        <h5>Contacto</h5>
        <p>
          Hipólito Yrigoyen 3871, B8000 Bahía Blanca, Provincia de Buenos Aires
        </p>
        <p>Email: ventas@bahiafoton.com.ar</p>
        <p>Teléfono: 0291 446-0146</p>
      </div>
      <div className="col-xs-12 copyright">
        <p className="copyright-text">
          © 2024 SyM Soluciones IT. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
