import axios from "axios";

const API_BASE_URL = "https://penamatias.alwaysdata.net/api";

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, { email });
    return response.data;
  } catch (error) {
    console.error("Error al suscribirse al newsletter:", error);
    throw error;
  }
};

export async function getBrands() {
  try {
    const response = await axios.get(`${API_BASE_URL}/marcas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
  }
};

export async function getCategories(){
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
  }
}

export async function getUseds() {
  try {
    const response = await axios.get(`${API_BASE_URL}/usados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usados:', error);
  }
}

export async function getVehicles(category){
  try {
    const response = await axios.get(`${API_BASE_URL}/vehiculos/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
  }
}

export async function getClients(){
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
  }
}

export async function sendEmail(name, email, message, asunto) {
  try {
    const response = await axios.post(`${API_BASE_URL}/contacto`, { name, email, message, asunto });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}