import {useState, useRef} from 'react'
import Dropdown from '../components/Dropdown'

// the data should live in the parent component not the reusable atomic component
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const COLOR_MAP = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
}
// apply a classname based on selected value
// COLOR_MAP[{value.value}]

const DATA_TO_FILTER = [
  {id: 1, name: 'Katie', team:'red'}, 
  {id: 2, name: 'Tony', team:'blue'},
  {id: 3, name: 'Srividhya', team:'red'},
  {id: 4, name: 'Sal', team:'blue'},
  {id: 5, name: 'River', team:'green'},
]


// parent has to hold data so that it can filter and help communicate between sibling components.

const DropdownPage = () => {
  // whenever we have a form element, the parent of the form is what keeps track of the user selected values
  const [value, setValue] = useState(null)
  let filteredData = DATA_TO_FILTER

  /* ?. means optional chaining
  if value is null, stop and dont explode
  i.e if value exisst then we can go inside and get a property */

  if (value ?.value){
    // Array.filter takes a callback function that recueves each ibject ine at a time

    filteredData = DATA_TO_FILTER.filter((s) => s.team === value.value)
    // putting the entire function in one line without braces is called an implicit return.  
    // The function will return the result of the expression after the =>.  
    // If you use braces, you have to explicitly return a value.
  }

  const handleChange = (option) => {// we have to store setValue in the parent component because the parent is what keeps track of the user selected value
    // the dropdown component will pass option back up to the parent component when the user selects an option
    setValue(option)
  }
  // the parent element of any form element passes down a
  // onChange handler and a value prop linked to state
  return (
    <>
      {/* value?.label = if value exists, render the label, otherwise exit */}
      <h1 className={COLOR_MAP[value?.value] || undefined}>
        Dropdown page with user selected value of {value?.label}
      </h1>
      <Dropdown options={OPTIONS} onChange={handleChange} value={value} />
      <h2 className="mt-4">
        Students from {value?.label || 'every team'}
      </h2>
      {filteredData.map((student) => (
        <p key={student.id}>{student.name}</p>
      ))}
    </>
  )
}

export default DropdownPage
