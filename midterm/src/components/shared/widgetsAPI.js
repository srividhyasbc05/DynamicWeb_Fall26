import axios from 'axios'
const BASE = 'http://localhost:3000'

export const fetchWidgets = async () => {
  const response = await axios.get(`${BASE}/widgets`)
  return response.data
}

export const createWidget = async (widget) => {
  // The provider builds the id (type-randomUUID) BEFORE calling this.
  const response = await axios.post(`${BASE}/widgets`, widget)
  return response.data
}

export const updateWidget = async (id, changes) => {
    // PATCH is used to update only the fields that changed, not the whole record.
  const response = await axios.patch(`${BASE}/widgets/${id}`, changes)
  return response.data
}

export const deleteWidget = async (id) => {
  await axios.delete(`${BASE}/widgets/${id}`)
}