import {useState, useRef, useEffect} from 'react'
import {GoChevronDown} from 'react-icons/go'
import Panel from './Panel'

const Dropdown = (props) => {
  const {options, onChange, value} = props
  const [isOpen, setIsOpen] = useState(false)

  const divEl = useRef()
  /* useEffect takes 2 arguments, function to fire and array of dependencies (things to watch)
  useEffect(() => {}, []) = run once when the component mounts
  useEffect(() => {}, [thing1, thing2]) = run on mount or whenever thing1 or thing2 updates
  useEffect(() => {}) run after every single render which is the same as accidentally calling a function
  
  we can just add a plain vanilla js event to close the dropdown when the user clicks outside

  or we could return another function which gets fired when the component unmounts. 
   This is called a cleanup function.  
   We can use this to remove the event listener when the component unmounts. */
  
   useEffect(()=>{
    //add an event listener to the document object that listens for clicks
    const handlerFunction = (event) =>{
      // if I click on NOT the referenced div
      if (!divEl.current.contains(event.target)){
        setIsOpen(false)
      }
      document.addEventListener('click', handlerFunction)

      return () => {
        // remoe event listener and cleanup when component is not on page
        document.removeEventListener('click', handlerFunction)
      }
    }
   })



  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setIsOpen(false)
    // onChange belongs to the parent -- the parent owns the selected value.
    onChange(option)
  }

  const renderedOptions = options.map((opt, index) => (
    <div ref ={divEl}
      onClick={() => handleOptionClick(opt)}
      key={index}
      className="hover:bg-sky-100 rounded cursor-pointer p-1"
    >
      {opt.label}
    </div>
  ))

  return (
    <div className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {value ? value.label : 'Select...'} <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  )
}

export default Dropdown