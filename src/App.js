import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider';
import LoadingButton from '@mui/lab/LoadingButton';
import animal_type from "./types/animal";
import { Checkbox } from "@mui/material";


/*
Todo:
-Convert project to typscript (optional)
-Proper naming
-Adding loading effect
-Switch button to enable filters
-Adding sliderbar
-Filter sliderbar with given input
-Fetch filtered animal if filter is enabled


*/

function App() {
  const [animal, setAnimal] = useState(animal_type);
  const [checkedFilter, setCheckedFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterHeightValue, setFilterHeightValue] = useState(0);

  const getData = async () => {
    try {

      

      setLoading(true);
      let request = await axios.get("https://api.thedogapi.com/v1/breeds");
      let randomData = Math.floor(Math.random() * request.data.length);
      setAnimal(request.data[randomData]);
      setLoading(false);
            //Check if filter is on
            if(checkedFilter){
              // get the dog.height array
              const DogHeight = request.data.map(a => a.height.metric)
              // get frist 2 numbers
              const FirstTwoLetters = DogHeight.map(a => a.slice(0, 2))
              // empty array for index
              const MatchingHeight = []
              
              
              for(let i=1; i<FirstTwoLetters.length+1; i++){
                if(parseInt(FirstTwoLetters[i-1]) === filterHeightValue){
                  MatchingHeight.push(i-1)
                }
              }

              // get a random dog
              let randomHeight = Math.floor(Math.random() * (MatchingHeight.length-1));
              //
              setAnimal(request.data[MatchingHeight[randomHeight]])
              // console.log(DogHeight)
              console.log(randomHeight)
              console.log(FirstTwoLetters)
              console.log(MatchingHeight)
            }
            //Filter the list of data to the filterHeightValue
      
            //Randomize from the filtered list 
      
            //setAnimal the filtered result
      

    } catch (err) {
      throw err;  
    }

   
  };

  useEffect(() => {
    
    getData();
    console.log(animal);
  }, []);

  return (
    <div className="app">
      <div className="container">
        {animal?.name.length > 0 && (
          <>
            <div className="image">
              <img alt={animal.image.id} src={animal?.image.url} width="300" height="300"></img>
            </div>
            <div className="name">
              <p>name: {animal?.name}</p>
            </div>
            <div className="height">
              <p>height: {animal?.height.metric}</p>
            </div>
            <div className="weight">
              <p>weight: {animal?.weight.metric}</p>
            </div>
            <div className="bred for">
              <p>bred for: {animal?.bred_for}</p>
            </div>
            <div className="breed">
              <p>breed: {animal?.breed_group}</p>
            </div>
            <div className="switch_button"> 

           
            <Switch onChange={() => {
              setCheckedFilter(!checkedFilter)

            }} checked={checkedFilter}/>
            
            {filterHeightValue && (
             <div>{filterHeightValue}</div>
            )}
            
            {checkedFilter && (
              <Slider
              aria-label="Custom marks"
              defaultValue={0}
              value={filterHeightValue}
              min={0}
              max={100}
              onChange={(event) => {
                event.preventDefault();
                setFilterHeightValue(event.target.value)
              }}
              step={1}
              valueLabelDisplay="auto"
             
            />
            )} 
            </div>
      
            <div className="button">
            <LoadingButton
          size="small"
          onClick={() => {
            getData()
          }}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Fetch data
        </LoadingButton>
           
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;