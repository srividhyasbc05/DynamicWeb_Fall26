import EditListItem from './EditListItem';
import {useState} from 'react';
import useTodosContext from '../context/use-todos-context';

const ListItem = (props) => {
  const {todo} = props;
  const {deleteTodoById, updateTodoById, toggleTodoById} = useTodosContext(); 
  // we get the onDelete and onEdit functions from the context so that we can call them when the user clicks the delete or edit buttons. 
  // This is how we pass the functions down to the ListItem component without having to pass them through multiple levels of components.
  const [editing, setEditing] = useState(false);

  console.log('ListItem sees:', useTodosContext())
  const handleEdit = async (id, newTitle) => {
    await updateTodoById(id, newTitle); // pass the title currently entered in the edit form
    // needs to be await so that the value is updated in the database before we set editing to false, otherwise the value will not be updated in the UI.
    setEditing(false);

  }
  if(editing){
    return <EditListItem todo={todo} onSubmit={handleEdit} />; // takes the id and title from onSubmit and passes it to onEdit above. 
  }

  const handleToggle = async () => {
    await toggleTodoById(todo.id); // pass the id of the todo to be toggled
  }

  
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <li>
      <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={todo.done}
      onChange={handleToggle}
    />
    <span className={todo.done ? 'line-through opacity-50' : ''}>
      {todo.title}
    </span>
  </div>
      <div className="flex gap-3 text-sm">
        <button type="button" className="text-blue-700" onClick={() => setEditing(true)}>
          edit
        </button>
        <button type="button" className="text-red-600" onClick={() => deleteTodoById(todo.id)}>
          delete
        </button>
      </div>
      </li>
    </div>
  )
}

export default ListItem ;