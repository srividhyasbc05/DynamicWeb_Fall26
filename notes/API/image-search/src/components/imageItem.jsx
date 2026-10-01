//individual image w driv wrapped around for styling purposes
// receives individual image

const ImageItem = (props) =>{

    const {image} = props;
    return (
        <div className = "p-4">
            <img src = {image.urls.small} alt = {image.alt_description} className = "rounded-md"/>
        </div>
    )

}
export default ImageItem;
