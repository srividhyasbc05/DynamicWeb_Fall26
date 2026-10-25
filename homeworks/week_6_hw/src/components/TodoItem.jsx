// TodoItem knows what one row looks like.

import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggle} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)
  // The toggle is local state in TodoItem — showEdit. Each row has its own. 
  // That is why clicking edit on row three does not open a form on row one.

  const handleDelete = () => {
    // the item knows WHICH todo it is. It does not know how to delete one.
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    // close the form once the edit has gone up
    setShowEdit(false)
  }
  const handleToggle = () => {
    onToggle(todo.id)
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={todo.done}
      onChange={handleToggle}
    />
    <span className={todo.done ? 'line-through text-gray-400' : ''}>
      {todo.title}
    </span>
  </div>
      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem