import axios from 'axios'

const BASE = 'http://localhost:3000'

export const fetchTodos = async (listId) => {
  const response = await axios.get(`${BASE}/todos`, { params: { listId } })
  return response.data
}

export const createTodo = async (title, listId) => {
  const response = await axios.post(`${BASE}/todos`, { title, listId, done: false })
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  // PUT REPLACES the record. Send the whole todo, not just the bit that
  // changed, or everything else on it is gone.
  const response = await axios.put(`${BASE}/todos/${todo.id}`, todo)
  return response.data
}
