import {useState, useReducer} from 'react'
// UseReducer is a plain function that takes current state
// and returns the next state, so state is now an object 
// it cannot change the state given (cannot directly mutate it) 
// but instead returns a new state object with all of our states 
// lives outside component code

// Action types as constants. A misspelled STRING fails silently; a misspelled
// VARIABLE NAME throws an error that points at the line. ALL_CAPS is the
// convention -- it tells another developer "this is an action type".
const INCREMENT_COUNT = 'increment-count'
const DECREMENT_COUNT = 'decrement-count'
const SET_VALUE_TO_ADD = 'set-value-to-add'
const ADD_VALUE_TO_COUNT = 'add-value-to-count'


const reducer = (state, action) => {
    // if i dispatch smthng there will be an action with it
    //return{
        //...state,
        //count: state.count + 1, // copies existing state and overriding one field
    //}
    // always return state as defualt after conditions

     //action.type says WHY reducer is running
    // sometimes needs a payload -- extra info to do the job
    switch (action.type)
    {
        case INCREMENT_COUNT:
            return {
                ...state,
                count: state.count + 1,
            }
        case DECREMENT_COUNT:
            return {
                ...state,
                count: state.count - 1,
            }
        case SET_VALUE_TO_ADD:
            return {
                ...state,
                valueToAdd: action.payload,
            }
        case ADD_VALUE_TO_COUNT:
            return {
                ...state,
                count: state.count + state.valueToAdd,
            }
        default:
        return state
    }
    
    // if (action.type === DECREMENT_COUNT) {
    //     return {
    //         ...state,
    //         count: state.count - 1,
    //     }
        
    // }
    // if (action.type === SET_VALUE_TO_ADD) {
    //     return {
    //         ...state,
    //         valueToAdd: action.payload,
    //     }
    // }
    // if (action.type === ADD_VALUE_TO_COUNT) {
    //     return {
    //         ...state,
    //         count: state.count + state.valueToAdd,
    //     }
    // }
    
}
const CounterPage = (props) => {
  const {initialCount} = props
  //const [count, setCount] = useState(initialCount)
  //const [valueToAdd, setValueToAdd] = useState(0)
  const [state, dispatch] = useReducer(reducer, {// pass in initial state 
    count: initialCount,
    valueToAdd: 0,
  })

  const increment = () => {
    dispatch({type: INCREMENT_COUNT}) // dispatch is a function that takes an action object
  }

  const decrement = () => {
    dispatch({type: DECREMENT_COUNT})
  }

  const handleChange = (event) => {
    // every value out of an input is a STRING. parseInt turns it into a
    // number, and an empty input gives '' -- which parseInt reads as NaN.
    // it'll turn into your num + '' which is NaN
    // `|| 0` catches that, so valueToAdd is always a usable number.
    const value = parseInt(event.target.value) || 0
    dispatch({type: SET_VALUE_TO_ADD, payload: value})
    // doesn't update anythign right now, it just indicates to run the reducer
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({type: ADD_VALUE_TO_COUNT})

  }

  return (
    <div>
      <p className="text-5xl font-bold tabular-nums mb-4">{state.count}</p>
      //tabular nums -- makes the numbers all the same width, so they don't jump around when they change

      <div className="flex gap-2">
        <button
          onClick={increment}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          -1
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex items-end gap-2">
        <div>
          <label className="block text-sm text-gray-600" htmlFor="add">
            Add a number
          </label>
          {/* valueToAdd || '' -- otherwise the field shows a 0 the user has
              to delete before they can type anything */}
          <input
            id="add"
            type="number"
            value={state.valueToAdd || ''}
            onChange={handleChange}
            className="mt-1 w-24 rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
          Add it
        </button>
      </form>
    </div>
  )
}

export default CounterPage