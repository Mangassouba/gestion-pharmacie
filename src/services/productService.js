import axios from 'axios';

const API_URL = 'http://localhost:3000/products/';

// Récupération du token depuis le stockage local (ou autre méthode d'obtention du token)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllProducts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthHeaders());
  return response.data;
};

const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${API_URL}${productId}`, productData, getAuthHeaders());
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}${productId}`, getAuthHeaders());
  return response.data;
};

export default {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
