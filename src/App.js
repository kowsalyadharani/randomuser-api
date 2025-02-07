import { useEffect, useState } from "react";
import './App.css';

function App() {
  const[apidata,setApiData]=useState([]);
  const[weatherApiData, setWeatherApiData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(()=> {
   
   fetch("https://randomuser.me/api/?results=15")
    .then((response) => response.json())
    .then((data) => setApiData(data.results))

    //.then(console.log(weatherApiData))

    }, []);


    useEffect(() => {
      if(apidata) {
        console.log(apidata)
        apidata.forEach(person => {
          console.log(person)
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${person.location.coordinates.latitude}&lon=${person.location.coordinates.longitude}&appid=7183001c5565af8cd628ef222cade465`)
          .then(res => res.json())
          .then((data) => setWeatherData([...weatherData, data.weather[0].description]))
          //setWeatherApiData([...weatherApiData, person.location.coordinates])
        })
      }
      
      
      //fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${}&lon=${}&appid={API key}`)

    }, [apidata])
  
  return (
    <div className="App">
      
      <h3>API fetching</h3>
      <div className="profiles-container">
      {apidata   && apidata.map((user, index) => (
    
        <div key={index} className="profile">
          <img src={user.picture.medium}></img>
          <br/>
          Name: {user.name.first}
          <br/>
          Gender: {user.gender}
          <br/>
          Email : {user.email}
          <br/>
          Phone : {user.phone}
          <br/>
          Age : {user.dob.age}
          <br/>
          Country : <img src={`https://flagsapi.com/${user.nat}/flat/64.png`} />
          <br/>
          weather :  {weatherData[index]}
          <br/>
          
        </div>
      ) 
      )}
      </div>
    </div>
  );
}

export default App;