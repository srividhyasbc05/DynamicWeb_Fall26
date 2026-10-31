import {createContext, useState, useCallback} from 'react'

// aliased because the Provider defines functions with the SAME names
import {
  fetchTodos as fetchTodosRequest, 
  createTodo as createTodoRequest, 
  deleteTodo as deleteTodoByIdRequest, 
  updateTodo as updateTodoByIdRequest} 
from '../list/todosAPI'

// we use a context so that we can share the todos state and the functions to manipulate it between components without having to pass them down as props through multiple levels of components.
const TodosContext = createContext()
export default TodosContext

const Provider = ({ children, listId }) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodos = useCallback(async () => {  
    try{
      setTodos(await fetchTodosRequest(listId))
    } catch (error) {
      console.error('Error fetching todos:', error)
      setError('Could not reach the server. Is `npm run server` running?')
    }finally {
      setIsLoading(false)
    }
  }, [listId])
    // useCallback is used to remember the function between renders, so that it doesn't get recreated every time the component re-renders. 
    // This is important because we use  fetchTodos as a dependency in the useEffect in ListWidget, and we don't want to trigger the effect every time the component re-renders.
    // we use the listId as a dependency because if the listId changes, we want to fetch the todos for the new listId.

  const createTodo = async (title) => {
    try {
        const newTodo = await createTodoRequest(title, listId);
        setTodos([...todos, newTodo]);
    } catch (error) {
        console.error('Error creating todo:', error);
    }
  }

  const deleteTodoById = async (id) => {
    try {
        await deleteTodoByIdRequest(id);
        setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
  }

  const updateTodoById = async (id, newTitle) => {
    try {
          const todoToUpdate = todos.find(todo => todo.id === id);
          if (todoToUpdate) {
              const updatedTodo = await updateTodoByIdRequest({ ...todoToUpdate, title: newTitle });
              setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
          }
      } catch (error) {
          console.error('Error updating todo:', error);
      }
    }

  const toggleTodoById = async (id) => {
  try {
    const todo = todos.find((t) => t.id === id)
    // update is spread to create a new object with the same properties as the original todo, but with the done property toggled. 
    // This is important because we don't want to mutate the original todo object, we want to create a new one with the updated value.
    const updated = await updateTodoByIdRequest({ ...todo, done: !todo.done })
    setTodos(todos.map((t) => (t.id === id ? updated : t)))
  } catch (err) {
    console.error('Error toggling todo:', err)
  }
}

const valuesToShare = {
    todos,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    deleteTodoById,
    updateTodoById,
    toggleTodoById,
  }

  return (
    <TodosContext.Provider value={valuesToShare}>
      {children}
    </TodosContext.Provider>
  )
}



export {Provider}
