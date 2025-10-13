


import axios from 'axios';
import { insertOne } from '../common/mongo';
import moment from 'moment';

exports.getGSTData =async(req : any,res : any)=>{
    let format = req.body.format || "json"
    const api_to_connect = `https://api.data.gov.in/resource/14613c4e-5ab0-4705-b440-e4e49ae345de?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=${format}`
    try {
        const response = await axios.get(api_to_connect);
        await insertOne('finance',{...response?.data,date : moment().unix()});
        return response?.data
    }
    catch(e){
        return  "error while fetching";

    }

}




exports.getHortiCropData =async(req : any,res : any)=>{
    let format = req.body.format || "json"
    const api_to_connect = `https://api.data.gov.in/resource/46f587a9-7476-443e-915f-fc756a6b4e2c?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=${format}`
    try {
        const response = await axios.get(api_to_connect);
        await insertOne('crops',{...response?.data,date : moment().unix(),crop_type : "horti"});
        return response?.data
    }
    catch(e){
        return  "error while fetching";

    }

}



exports.getDisasterData =async(req : any,res : any)=>{
    let format = req.body.format || "json"
    const api_to_connect = `https://api.data.gov.in/resource/6a0cfec4-df79-4c1e-90ba-b8eecb495c4d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=${format}`
    try {
        const response = await axios.get(api_to_connect);
        await insertOne('disaster_funds',{...response?.data,date : moment().unix()});
        return response?.data
    }
    catch(e){
        return  "error while fetching";

    }

}
    


