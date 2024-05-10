import React from 'react';
import whatsappLogo from '../../assets/WhatsApp.png';
import './WhatsAppButton.css';

const WhatsAppButton = () => {

  const mensaje = encodeURIComponent(`Hola, quiero Realizar una consulta`);


  const handleClick = () => {

    window.open(`https://wa.me/+5492916446200/?text=${mensaje}`, '_blank');

  };


  return (

    <div className="whatsapp-button" onClick={handleClick}>

      <a href="">

        <img src={whatsappLogo} alt="logo de whatsapp" />

      </a>

    </div>

  );

};
export default WhatsAppButton;
