import { useState , useRef } from 'react'
import { LuSearchCheck } from "react-icons/lu";
import './App.css'
import axios from 'axios';
import ImageCard from './components/ImageCard';
// import data from './components/data.json';
const API_KEY = '2qeiLKE0i6Ti3HRQO9DnRWqhPCSOkbwTP4egpRy8FpQ';
function App() {
  const input = useRef('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('Component Rendered');

  const getImages = async () => {
    const userQuery = encodeURIComponent(input.current.value);
    console.log(userQuery);
    // console.log('function Calling');
    if (!userQuery.trim()) {
      alert('Please enter a valid query!');
      return;
    }
    setIsLoading(true);


    try {
      const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${userQuery}`);
      const data = await response.json();
      setImages(data.results);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }

  }


  return (
    <>
      <div className="container">
        <h1>This is Ai Generative App</h1>
        <div className="input-box">
          <input type="text" placeholder="Enter your text here" ref={input} />
          <button onClick={getImages}><LuSearchCheck className='icon' /></button>
        </div>
        <div className="result">
            {isLoading ? (<h1>Loading...</h1>) : images.length > 0 ? (
                images.map((image, index) =>{
                  return(
                    <ImageCard key={`id_${index}`} props={image}/>
                  )
                })
              ) : (<h1>what's your mind Search</h1>)
              
            }
        </div>
      </div>
    </>
  )
}

export default App



