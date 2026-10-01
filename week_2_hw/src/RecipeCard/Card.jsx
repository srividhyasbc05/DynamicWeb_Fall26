import styles from './RecipeCard.module.css'
// styles is a plain JS obj mapping class names to generated unique ones
// className="card" becomes className={styles.card}
const Card = (props) => {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    )
}

export default Card