import {useState} from 'react';

const SearchBar = (props) => {
    // we want it to be a search term so empty is an empty string
    const [term, setTerm] = useState('');

    const {onSubmit} = props

// updates form value whenevr user types characters in the input field, every keystroke
    const handleChange = (event) => {
        // this doens't work
        setTerm(event.target.value);
    }
    // sends search term up to the parent component when user submits the form
    const handleFormSubmit = (event) =>{
        // automatically refreshes on submit, which we dont want, so we prevent default behavior which is 
        // to refresh the page on form submit
        // we would lose the search term if we refresh the page, so we prevent that
        event.preventDefault();
        onSubmit(term) // term comes from state
    }
    return(
        <div className = "p-4">
            <form onSubmit = {handleFormSubmit}>
            <input type= "text" 
            value = {term} 
            onChange = {handleChange} 
            className = "border border-gray-300 rounded-md p-2"/>
            </form>
        </div>
    )
}

export default SearchBar;