const student = 'World'


// react component os a function that returns JSX
function App() {
  return(
    // react components need one tag closing all the html together
    <div>
    <h1>Hello {student}</h1>
    <p>This is text that can be updated</p>
    </div>
  )
}
export default App;