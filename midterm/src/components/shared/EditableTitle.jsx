

const EditableTitle = (props) => {
    const {value, onChange} = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return(
        <input
        type="text"
        value={value} /* gets passed down from the state above, */
        onChange={handleChange} /* handleChange updated onChange, which updates the state above, passes it up */
        className="min-w-0 flex-1 rounded px-3 py-2  text-md font-bold  placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
}
export default EditableTitle;