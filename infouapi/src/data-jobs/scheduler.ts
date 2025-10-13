import cron from 'node-cron';


// for scheduling jobs
export const startScheduler = async()=>{

    try{
           cron.schedule('* * * * *', () => {
  console.log('Running a task every minute');
});

    }
    catch(e){

        console.log(e,"error");
        

    }
 

}