import * as express from 'express';
import { authenticate } from '../common/auth';

const Router = express.Router()

Router.get("/",()=>"working well on this method ");

const methoNameToControllerMap : any = {
    home : "../controller/home.controller.ts",
    weather : "../datacollection/weather.collection.api.ts",
    auth  : "../controller/auth.controller.ts",
    finance : "../datacollection/finance.collection.api.ts"
}


const commonMethodCall = async (req : any,res : any)=>{

    let methodName = req.body.methodName;

    if(!methodName || methodName == ''){
        return "Required Method Name"
    }
    let cntrlName = methodName.split("-")[0];
    let method = methodName.split("-")[1];

    if(!cntrlName){
        return "Api not supported yet;"
    }
    if(cntrlName && method){
        const CNTRL = require(methoNameToControllerMap[cntrlName]);

        if(CNTRL){
            //calling real api from here
           const responseData =  await CNTRL[method](req);
           return res.send(responseData);
        }
    }

}

//needs to implement auth middleware authenticate
Router.post("/commCall",commonMethodCall);
Router.post("/signup",authenticate,commonMethodCall);
Router.post("/login",authenticate,commonMethodCall);

module.exports = Router;