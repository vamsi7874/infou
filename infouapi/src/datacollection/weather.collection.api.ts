import * as axios from 'axios';

const indiaLatLan = {
  "lat": 20.5937,
  "lon": 78.9629
}
const EXTERNAL_API_MAP = {
    'weather' : {
        endPoint : 'https://api.openweathermap.org/data/2.5/weather',
        queryParams : ['lat','lon','appid'],
    }
}

const getWeatherData = ()=>{
    const apiToCall = EXTERNAL_API_MAP['weather']?.endPoint +`?lat=${indiaLatLan.lat}&lon=${indiaLatLan.lon}&appid=${process.env.WEATHER_API_KEY}`
    
    

}