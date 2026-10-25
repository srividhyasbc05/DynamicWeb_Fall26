// 1. Why does the GET live in a useEffect with [] rather than just being called in the component body?
//   Because we only want to fetch the todos once, when the component first appears. If we put it in the body, it would run on every render, which would cause an infinite loop of fetching and re-rendering.
// 2. n deleteTodoById, what happens if you move setTodos(...) above the await? Describe what the user would see when the server is down.
//  The row disappears from the screen immediately, and the await request fails because the server is down so it throws an error but there is nothing to catch it. The user sees the row disappear but the server still has it, so if they refresh the row will come back
// 3. Your filter in #2 — did it need a request? Why not?
//  Every todo is already in state because of the todos state so filtering only chnages what we show, not what info it has. 
// the filter choice lives in app because both the buttons and the list need it

import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
} from './api'


const App = () => {
  // the list lives HERE. Every component that reads or changes it is below
  // this one, so this is the lowest place that can own it.
  const [todos, setTodos] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')




  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  useEffect(() => {
//     const todos = await fetchTodos()
// -      setTodos(todos)
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        // the usual cause: you forgot to start the server in the second tab
        console.error(err)
        setError('Could not reach the server. Is `npm run server` running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])


  const createTodo = async(title) => {
    // NEVER todos.push(...). Push changes the array React is already holding,
    // so React compares it to itself, sees no change, and does not re-render.
    const newTodo = await createTodoRequest(title)
    // await comes first on purpose. If the server refuses — it is down, the id is wrong, the network dropped — 
    // the await throws and we never reach the line that changes state. 
    // The todo stays on screen, which is the truth.

    // here is a real technique called an optimistic update that does change the screen first — 
    // and then puts it back if the request fails. That second half is the part people forget.
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    // filter returns a NEW array containing everything that passes the test.
    // Everything except the one we are deleting passes.
    //const updatedTodos = todos.filter((todo) => {
      //return todo.id !== id
    //})

    await deleteTodoRequest(id)

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async(id, newTitle) => {
 // find the whole todo and send all of it, because PUT replaces
    const todo = todos.find((todo) => todo.id === id)
    const updated = await updateTodoRequest({...todo, title: newTitle})

    // map returns a new array the SAME length. Every todo comes back; the one
    // we are editing comes back as a new object with a new title.
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        //return {...todo, title: newTitle, done: false}
        return updated
      }
      return todo
    })
    //return {...todo, title: newTitle}

    // setTodos(updatedTodos)
  }

  const toggleTodoById = async (id) => {
  const todo = todos.find((todo) => todo.id === id)
  const updated = await updateTodoRequest({...todo, done: !todo.done})

  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return updated
    }
    return todo
  })
  setTodos(updatedTodos)
}


const visibleTodos = todos.filter((todo) => {
  if (filter === 'active') return !todo.done
  if (filter === 'done') return todo.done
  return true
})

const remaining = todos.filter((todo) => !todo.done).length

  console.log(todos)

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="flex gap-4 mb-4 text-sm">
  <button
    onClick={() => setFilter('all')}
    className={filter === 'all' ? 'font-bold underline' : 'text-gray-500'}
  >
    All
  </button>
  <button
    onClick={() => setFilter('active')}
    className={filter === 'active' ? 'font-bold underline' : 'text-gray-500'}
  >
    Active
  </button>
  <button
    onClick={() => setFilter('done')}
    className={filter === 'done' ? 'font-bold underline' : 'text-gray-500'}
  >
    Done
  </button>
</div>
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />
      {isLoading && <p className="text-gray-500">Loading your todos...</p>}

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>
      )}

      {!isLoading && !error && todos.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <TodoList todos={visibleTodos} onDelete={deleteTodoById} onEdit={editTodoById} onToggle={toggleTodoById} />
      )}

      <p className="mt-6 text-sm text-gray-500">
        {remaining} {remaining === 1 ? 'thing' : 'things'} left to do
      </p>
    </div>
  )
}

export default App