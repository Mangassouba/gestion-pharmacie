// src/services/authService.js
import axios from 'axios'

const API_URL = "http://localhost:3000/login"

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('token')
}

const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  console.log('Token:', localStorage.getItem('token'));

  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export default {
  login,
  logout,
  getCurrentUser
}
