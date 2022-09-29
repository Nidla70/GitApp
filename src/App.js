import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data,setData]= useState("")
  const [imgUrl, setImgUrl] = useState("")


  const getData = () => {
    axios.get('https://api.thedogapi.com/v1/breeds').then((response) => {

      function getRandomIndex(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
    
       
    
        return randomIndex;
    }

    let randomDog = getRandomIndex(response.data)

      setData(response.data[randomDog])
      console.log(response.data[randomDog])
      setImgUrl(response.data[randomDog].image.url)
    })
  }

  return (
    <div className="app">
      <div className='container'>
      <div className='image'><img src={imgUrl} weight="300" height="300"></img></div>
      <div className='name'><p>name: {data.name}</p></div>
      <div className='height'><p>height: {data.height?.metric}</p></div>
      <div className='weight'><p>weight: {data.weight?.metric}</p></div>
      <div className='bred for'><p>bred for: {data.bred_for}</p></div>
      <div className='breed'><p>breed: {data.breed_group}</p></div>
      <div className='button'><button onClick={getData}>Click me</button></div>
      
      </div>
    </div>
  );
}

export default App;
