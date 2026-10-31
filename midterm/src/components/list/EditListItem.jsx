import {useState} from 'react';
const EditListItem = (props) => {
    const {todo, onSubmit} = props;

    const [title, setTitle] = useState(todo.title);
    
    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(todo.id, title); // we pass up the id and title to the onSubmit function when the form is submitted
    }
    return(
    <form onSubmit={handleSubmit} className="flex gap-2 py-3"> {/* we pass up the id and title to the onSubmit function when the form is submitted */}
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm">
        Save
      </button>
    </form>
    )
}
export default EditListItem;