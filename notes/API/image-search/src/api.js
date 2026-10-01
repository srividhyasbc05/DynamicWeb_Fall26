//one job per file
import axios from "axios";

const KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const searchImages = async(term) => {
    //getting data
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        // await is a note to js asking it not to executre code until the response promise is resolved
        headers:{Authorization: `Client-ID ${KEY}`}, 
        // template literals, when insert a variable into a string, use backticks and ${}
        params: {
            query: term
        }
    });
    
    console.log(response.data);

    return response.data.results

}