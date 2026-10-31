// API for content widgets
// has fetch, create, update, and delete
// delete is only used when session ends, so that the user can start fresh next time.

import axios from 'axios'

const BASE = 'http://localhost:3000'

export const fetchContent = async (widgetId) => {
    const response = await axios.get(`${BASE}/otherWidgets/${widgetId}`)
    return response.data
    }

export const createContent = async (widgetId, type, content) => {
    const response = await axios.post(`${BASE}/otherWidgets`, { widgetId, type, content })
    return response.data
}

export const updateContent = async (widgetId, content) => {
    const response = await axios.put(`${BASE}/otherWidgets/${widgetId}`, { content })
    return response.data
}

export const deleteContent = async (widgetId) => {
    await axios.delete(`${BASE}/otherWidgets/${widgetId}`)
}