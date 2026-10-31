import axios from 'axios'
const BASE = 'http://localhost:3000'
export const fetchStyle = async () => { 
  const response = await axios.get(`${BASE}/style`)
  return response.data
}
export const updateStyle = async (style) => {
    const response = await axios.put(`${BASE}/style`, style)
    return response.data
}