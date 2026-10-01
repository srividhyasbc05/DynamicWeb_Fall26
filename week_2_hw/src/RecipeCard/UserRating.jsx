import {useState} from 'react'
import {FaHeart} from 'react-icons/fa'

import styles from './RecipeCard.module.css'

export default function UserRating() {
  // useState defines a piece of state and gives us back
  //   [ the current value, a function to change it ]
  // The argument is the starting value.
  const [count, setCount] = useState(0)

  const handlePlusClick = () => {
    setCount(count + 1)
  }

  const handleMinusClick = () => {
    setCount(count - 1)
  }

  return (
    <div className={styles.rating}>
      {/* Conditional rendering with &&:
          React renders nothing for false, null and undefined, so
          `count > 0 && <button/>` shows the button only when count > 0. */}
      <span className={styles.rating_btn_slot}>
      {count > 0 && (
        <button  className = {styles.rating_btn} onClick={handleMinusClick} className={styles.rating_btn}>
          [-]
        </button>
      )}
      </span>

      <span className={styles.hearts}>
        {/* [...Array(count)] makes an array of `count` empty slots
            so we have something to map over. */}
        {[...Array(count)].map((heart, i) => (
          <span key={i}>
            <FaHeart />
          </span>
        ))}
      </span>
    <span className={styles.rating_btn_slot}>

      {count < 5 && (
        <button className={styles.rating_btn} onClick={handlePlusClick} className={styles.rating_btn}>
          [+]
        </button>
      )}
          </span>

    </div>
  )
}