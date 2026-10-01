import {recipeData} from './recipe-data.js'
import RecipeImg from './RecipeImg.jsx'
import RecipeInfo from './RecipeInfo.jsx'
import IngredientsList from './IngredientsList.jsx'
import InstructionsList from './InstructionsList.jsx'
import styles from './RecipeCard.module.css'
import Card from './Card.jsx'
import UserRating from './UserRating.jsx'

const RecipeCard = () => {
    return(
        <Card>
            <RecipeImg imgSrc={recipeData.imgSrc} imgAlt={recipeData.imgAlt} />
            <div className={styles.card_text}>
                <RecipeInfo name={recipeData.name} description={recipeData.description} />
                <div className={styles.card_lists}>

                <IngredientsList ingredients={recipeData.ingredients} />
                <InstructionsList instructions={recipeData.instructions} />
                <UserRating />
        </div>
        </div>
      </Card>

    )
}

export default RecipeCard