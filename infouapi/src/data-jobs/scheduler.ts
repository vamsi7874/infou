import cron from 'node-cron';
import axios from 'axios';
import moment from 'moment';
import { insertOne } from '../common/mongo';

const mapToCron: Record<string, string> = {
  weather: "weather-getWeatherData",
  finance : "finance-getGSTData"
};


//commcode for cron jobs.Generally cron jobs are hit and forget type.so we can hit whenever we need from ui and its do the remaining
//work in background and strore the logs in db.needs to build ui for cron logs .

export const startScheduler = async (req: any) => {
    console.log(req?.body?.key,"requ");
    
        const path: string = "http://localhost:3000/app/commCall";
    const key = req?.body?.key;
  try {
    const jobpayload = {
      methodName: mapToCron[key]
    };



    // Schedule the job to run every hour (at minute 0)
    cron.schedule('* * * * *', async () => {
      try {
        const response = await axios.post(path, jobpayload);
      } catch (error: any) {
        console.error('Cron task failed:', error?.message || error);
        await insertOne("cron_logs",{cron_type : key,status : "failed",scheduled_on : moment().unix()})
      }
    });

    console.log('Cron job scheduled successfully.');
    await insertOne("cron_logs",{cron_type : key,status : "scheduled",scheduled_on : moment().unix()})

  } catch (e: any) {
    console.error('Failed to start scheduler:', e?.message || e);
    await insertOne("cron_logs",{cron_type : key,status : "failed",scheduled_on : moment().unix()})
  }
};
