
const RecipeImg = (props) => {
    //destructuring props to get the image source and alt text
    const { imgSrc, imgAlt } = props;
    return (
        <div id = "recipe-img">
            <img src={imgSrc} alt={imgAlt} className = {styles.img} />
        </div>
    )
}

export default RecipeImg;