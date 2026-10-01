import {useState, useEffect, useRef} from 'react'
import classNames from 'classnames'
import Button from './Button'
import {twMerge} from 'tailwind-merge'
// card that conditionally renders content based on props
// changes color based on type of content
// clicking an expand button will expand the card to show more content
// includes a button from the Button component that can be used to trigger an action
const Card = (props) => {
    // props passed in will be
    // CONTENT: title, date, description, type
    // ACTION: onClick
    // state- is the card expanded?
    const {title, date, description, type, ...otherProps} = props
    const [isExpanded, setIsExpanded] = useState(false);

    const divEl = useRef()

    useEffect(() => {
        if (!isExpanded) return;

        const handlerFunction = (event) => {
            //.current is a Reacto property that is used to store the current value of a useRef
            if (!divEl.current.contains(event.target)) {
                        console.log("CLICKED OUTSIDE → CLOSING");

                setIsExpanded(false)
            }
        }

        document.addEventListener('click', handlerFunction)

        return () => {
            document.removeEventListener('click', handlerFunction)
        }
    }, [isExpanded])

    const cardClass = `p-4 m-2`
    const cardStyle = twMerge(classNames(otherProps.className, cardClass, {
        "bg-blue-500": type === "image",
        "bg-green-500": type === "text",
        "bg-gray-500": type === "disabled"
    }));

    return(
        <div ref={divEl} className={cardStyle}>
        <h1>{title}</h1>
        <p>{date}</p>
                {isExpanded
                    ? <p>{description}</p>
                    : <button 
                        onClick={() => setIsExpanded(true)}
                        className="cursor-pointer"
                      >
                        View More
                      </button>
                }
        <Button secondary rounded>Click Me</Button>
        </div>
    )


}
export default Card