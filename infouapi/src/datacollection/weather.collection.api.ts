import axios from 'axios';

import { insertOne } from '../common/mongo';


const indiaLatLan = {
  "lat": 20.5937,
  "lon": 78.9629
}

exports.getWeatherData =async(req : any,res : any)=>{
    const api_to_connect = process.env.WEATHER_API_URI
    const latitude = req.body.latitude || indiaLatLan.lat
    const longitude = req.body.longitude || indiaLatLan.lon
    const daily = "temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,wind_direction_10m_dominant"
    const hourly= "rain,showers,snowfall,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility"
	const current = "temperature_2m,is_day,showers,rain,snowfall"
    const timezone = "auto"
    const forecast_days = 3; // needs to change this later
    const construct_uri = `${api_to_connect}?latitude=${latitude}&longitude=${longitude}&daily=${daily}&hourly=${hourly}&current=${current}&timezone=${timezone}&forecast_days=${forecast_days}`
    try {
        const response = await axios.get(construct_uri);
        const weatherData = await insertOne("weather",response?.data);
        return weatherData?.ackknowledged ?? false;
        
    }
    catch(e){
        return  "error while fetching";

    }

}


    

