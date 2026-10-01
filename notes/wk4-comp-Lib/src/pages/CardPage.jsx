import Card from "../components/Card";

const CardPage = () => {
    // maps items from array to Card components
    const CONTENT = [
        {
            title: "Card 1",
            date: "2023-01-01",
            description: "This is the first card.",
            type: "image"
        }, 
        {
            title: "Card 2",
            date: "2023-01-02",
            description: "This is the second card.",
            type: "text"
        },
        {
            title: "Card 3",
            date: "2023-01-03",
            description: "This is the third card.",
            type: "disabled"
        },
        {
            title: "Card 4",
            date: "2023-01-04",
            description: "This is the fourth card.",
            type: "image"
        }
    ]
    return(
        <div>
            {CONTENT.map((content, index) => (
                <Card key={index} {...content} type={content.type} />
            ))}
        </div>
        
    )

}
export default CardPage;