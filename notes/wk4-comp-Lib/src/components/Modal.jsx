import {createPortal} from 'react-dom'

const Modal = (props) => {
    const {onClose, title, children, actionBar} = props
  // `fixed` not `absolute`: absolute positions against the nearest positioned
  // ancestor, which breaks the moment somebody puts the modal inside a
  // `relative` container or scrolls the page.

  // createPortal(whatToRender, whereToPutIt) -- the modal's html ends up in
  // #portal at the bottom of index.html, no matter where <Modal /> lives
  // in our component tree.
  return createPortal(
    <>
    {/* transparent overlay */}
      <div className="fixed inset-0 bg-gray-300 opacity-50"></div>
    {/* content */}
      <div className="fixed inset-40 p-10 bg-white">I'm a modal!</div>
    </>
    ,
    document.getElementById('portal')
  )
}

export default Modal