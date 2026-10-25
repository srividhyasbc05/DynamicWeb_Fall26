//import {useContext} from 'react'
import TodosContext from '../context/todos'

// TodoList knows how to map over an array of todos and render a TodoItem for each one. 
// It does not know how to delete or edit a todo, 
// but it takes onDelete and onEdit as props and passes them down to each TodoItem.

import TodoItem from './TodoItem'

const TodoList = (props) => {
  // const {todos, onDelete, onEdit} = props
  // it takes onDelete and onEdit, does nothing with either, and passes them to TodoItem. 
  // That is prop drilling — a component handling props it does not care about because something below it does.

  const {todos} = useTodosContext()


  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} /> /* onDelete={onDelete} onEdit={onEdit} --- IGNORE --- */
    // key={todo.id}, because React needs to tell the rows apart when the array changes.
  })

return (
    <div>
      {/* <p>the number from context: {num}</p> */}
      {renderedTodos}
    </div>
  )}

export default TodoList