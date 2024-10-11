import { useState } from 'react'
import { LuSearchCheck } from "react-icons/lu";
import './App.css'
import axios from 'axios';
const API_KEY = 'Bearer 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';
function App() {
  const [userQuery, setUserQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const getImages = async () => {

  //   if (!userQuery.trim()) {
  //     alert('Please enter a valid query!');
  //     return;
  //   }

  //   const headers = {
  //     Authorization: API_KEY,
  //   }

  //   const url = 'https://api-inference.huggingface.co/models/prompthero/openjourney-v4';

  //   const data = {
  //     "inputs": userQuery,
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(url, data, {
  //       headers,
  //       responseType: 'blob',
  //     });
  //     const imgURL = URL.createObjectURL(response.data);
  //     console.log(imgURL);
  //   }catch (err) {
  //     console.error(`Error: ${err}`);
  //   }finally{
  //     setIsLoading(false);
  //   }
    
  // }

  const getImages = async () => {
    async function query(data) {
      console.log(data);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    }
    query({ "inputs": userQuery }).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <div className="container">
      <h1>This is Ai Generative App</h1>
        <div className="input-box">
          <input type="text" placeholder="Enter your text here" onChange={(e) => setUserQuery(e.target.value)} />
          <button onClick={getImages}><LuSearchCheck className='icon' /></button>
        </div>
        <div className="result">
          {isLoading ? <p>Generating image...</p> : images && <img src={images} alt="Generated result" />}
        </div>
      </div>
    </>
  )
}

export default App
