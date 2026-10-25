// TodoList knows how to map

import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit, onToggle} = props
  // it takes onDelete and onEdit, does nothing with either, and passes them to TodoItem. 
  // That is prop drilling — a component handling props it does not care about because something below it does.

  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
    // key={todo.id}, because React needs to tell the rows apart when the array changes.
  })

  return <div>{renderedTodos}</div>
}

export default TodoList