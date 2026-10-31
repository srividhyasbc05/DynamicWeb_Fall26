import axios from 'axios'
const BASE = 'http://localhost:3000'

export const fetchTemplates = async () => {
  const response = await axios.get(`${BASE}/templates`)
  return response.data
}

export const createTemplate = async (template) => {
  const response = await axios.post(`${BASE}/templates`, template)
  return response.data
}