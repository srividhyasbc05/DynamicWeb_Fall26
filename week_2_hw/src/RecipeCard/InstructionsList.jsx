import styles from './RecipeCard.module.css'

const InstructionsList = (props) => {
    const {instructions} = props;
  return (
    <div className = {styles.instructions_list}>
      <h3 className={styles.list_title}>Instructions:</h3>
      <ol> 
        {instructions.map((i, index) => (
          <li key={index}>
            {i}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsList;