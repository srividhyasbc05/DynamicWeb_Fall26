import styles from './RecipeCard.module.css'

const IngredientsList = (props) => {
    const {ingredients} = props;
  return (
    <div className = {styles.ingredients_list}>
      <h3 className={styles.list_title}>Ingredients:</h3>
      <ul> 
        {ingredients.map((i, index) => (
          <li key={index} className= {styles.list_item}>
            <span className={styles.measure}>{i.measure} </span>
            <span>{i.item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;