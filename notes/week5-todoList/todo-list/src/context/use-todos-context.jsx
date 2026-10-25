import {useContext} from 'react'
import TodosContext from '../context/todos'

//Every component that wants the todos would need two imports — useContext from react, and the context itself — plus the call. 
// Three lines of ceremony, repeated in five files.

//So we write our own hook. A custom hook is just a function whose name starts with use and which calls other hooks. 
// That is the entire rule. No magic.

// A custom hook: a function starting with `use` that calls other hooks.
// This one exists so components import ONE thing instead of two, and so
// there is a single place to change if the context ever moves.
const useTodosContext = () => {
  return useContext(TodosContext)
}

export default useTodosContext