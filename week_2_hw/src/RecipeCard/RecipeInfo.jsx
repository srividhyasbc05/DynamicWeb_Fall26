import {recipeData} from './recipe-data.js'
import styles from './RecipeCard.module.css'

const RecipeInfo = (props) => {
    // destructuring props to get the title and description
    const { name, description } = props;
    return(
        <div className = {styles.recipe_info}>
            <h2 className = {styles.recipe_title}> {name} </h2>
            <p> {description} </p>
            </div>

    )
}

export default RecipeInfo