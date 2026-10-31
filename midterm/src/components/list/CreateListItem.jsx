import { useState } from 'react';
import useTodosContext from '../context/use-todos-context';

const CreateListItem = () => {
    const { createTodo } = useTodosContext(); // we get the onCreate function from the context so that we can call it when the user submits the form. This is how we pass the function down to the CreateListItem component without having to pass it through multiple levels of components.
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        createTodo(title);
        setTitle('');
    }

    return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title} // gets passed down from the state above, 
        onChange={handleChange} // updates the state above, passes it up 
        placeholder="What needs doing?"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">Add</button>
    </form>
  )

}
export default CreateListItem;