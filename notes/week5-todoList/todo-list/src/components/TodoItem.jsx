// TodoItem knows what one row looks like.

import {useState} from 'react'
import TodoEdit from './TodoEdit'
import useTodosContext from '../hooks/use-todos-context'


const TodoItem = (props) => {
    const {todo} = props
  //const {todo, onDelete, onEdit} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.

  // STILL local state, and still correct. Context is for things other
  // components need. Nobody else cares whether this row is being edited.
  const [showEdit, setShowEdit] = useState(false)
  // The toggle is local state in TodoItem — showEdit. Each row has its own. 
  // That is why clicking edit on row three does not open a form on row one.

    const {deleteTodoById, editTodoById} = useTodosContext()


  const handleDelete = () => {
    // the item knows WHICH todo it is. It does not know how to delete one.
    deleteTodoById(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    editTodoById(id, newTitle)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <span>{todo.title}</span>
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