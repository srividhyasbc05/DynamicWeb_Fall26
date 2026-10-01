
import {useState} from 'react';
import SearchBar from './components/searchBar';
import {searchImages} from './api';
import ImageList from './components/imageList';

const App = () => {
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched,setSearched] = useState(false);


// since image search function is async, we need to await results 
// we need to await when calling search images 
// which means we need to flag the function as async
  const handleSubmit = async (term) => {
    setError(null);
    setSearched(true);

    try{console.log(`searching for ${term}`);
    const results = await searchImages(term);
    setImages(results);
  }
    
  catch(err){
    console.err
    setError('An error occurred while searching for images.');
  
  } finally{
    setIsLoading(false);
  }

  }


  // stores array of images
  return <div className="p-4">App
  
  <SearchBar onSubmit = {handleSubmit}/> <br/>
  (isLoading && <p className = "p-4 text-gray-500">Loading...</p>)
  (error && <p className = "p-4 text-red-500">{error}</p>)
  <ImageList images = {images}/>

  </div>
}

export default App