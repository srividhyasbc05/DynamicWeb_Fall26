// recieve data as a prop and map through them
import ImageItem from "./imageItem";

const ImageList = (props) =>{
    const {images} = props;


    const renderedImages = images.map((image) => {
        return <ImageItem key = {image.id} image={image}/>
        // MAP through images and return an image item each   
    })

    console.log(images);
    return <div>
        {renderedImages}
        
    </div>
}
export default ImageList;