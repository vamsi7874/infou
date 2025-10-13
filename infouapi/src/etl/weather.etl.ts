const runETLOnData = (rawData: any) => {
  const units_to_map = {
    interval: "seconds",
    temperature_2m: "°C",
    is_day: "",
    showers: "mm",
    rain: "mm",
    snowfall: "cm",
  };

  let insertedDbObj :any = {};

  insertedDbObj['realtime_data'] = rawData['current'];
  if(rawData['hourly'] && rawData['hourly']['time']){
    for(let i = 0;i<= rawData['hourly']['time']?.length;i++){
         for(let j = 0;j<= rawData['hourly']['rain']?.length;j++){
             for(let k = 0;k<= rawData['hourly']['showers']?.length;k++){
              for(let m=0;m<= rawData['hourly']['snowfall']?.length;m++){
                
              }
                
            
        
    }

        
    }

    }
  }


};
