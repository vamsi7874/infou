import { findAll } from "../common/mongo"

export const getLogsData = async (req : any)=>{

    try{

      const records : any =   await findAll('cron_logs');

      return records

    }
    catch(err){

        return err
    }

}