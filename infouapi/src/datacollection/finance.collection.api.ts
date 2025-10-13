


import axios from 'axios';

import { startScheduler} from "../data-jobs/scheduler"



exports.getGSTData =async(req : any,res : any)=>{
    let format = req.body.format || "json"
    const api_to_connect = `https://api.data.gov.in/resource/14613c4e-5ab0-4705-b440-e4e49ae345de?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=${format}`
    let weather_data
    try {

        setInterval(async ()=>{
             await startScheduler();

        },2000);
       
        const response = await axios.get(api_to_connect);
        return response?.data
    }
    catch(e){
        return  "error while fetching";

    }

}


    


