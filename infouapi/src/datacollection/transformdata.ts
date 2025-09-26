import  moment from "moment";
export const transformDailyWeather = (dailyData: any) => {
    
    const transformedData: { [key: string]: any } = {};
    const dates = dailyData.time;
    for (let i = 0; i < dates.length; i++) {
        const date = moment(dates[i]).format("DD MMMM YYYY");
        transformedData[date] = {
            temperature_2m_max: dailyData.temperature_2m_max[i],
            temperature_2m_min: dailyData.temperature_2m_min[i],
            rain_sum: dailyData.rain_sum[i],
            wind_speed_10m_max: dailyData.wind_speed_10m_max[i],
            wind_direction_10m_dominant: dailyData.wind_direction_10m_dominant[i],
        };
    }

    return transformedData;
}


export const transformHourlyData = (data :any) => {
    const restructuredData : any = {};
    const hourlyData = data.hourly;
    for (let i = 0; i < hourlyData.time.length; i++) {
        const timestamp = hourlyData.time[i];
        const date = timestamp.split('T')[0]; 
        if (!restructuredData[date]) {
            restructuredData[date] = {
                time: [],
                rain: [],
                showers: [],
                snowfall: [],
                cloud_cover: [],
                cloud_cover_low: [],
                cloud_cover_mid: [],
                cloud_cover_high: [],
                visibility: []
            };
        }
        restructuredData[date].time.push(timestamp);
        restructuredData[date].rain.push(hourlyData.rain[i]);
        restructuredData[date].showers.push(hourlyData.showers[i]);
        restructuredData[date].snowfall.push(hourlyData.snowfall[i]);
        restructuredData[date].cloud_cover.push(hourlyData.cloud_cover[i]);
        restructuredData[date].cloud_cover_low.push(hourlyData.cloud_cover_low[i]);
        restructuredData[date].cloud_cover_mid.push(hourlyData.cloud_cover_mid[i]);
        restructuredData[date].cloud_cover_high.push(hourlyData.cloud_cover_high[i]);
        restructuredData[date].visibility.push(hourlyData.visibility[i]);
    }

    return restructuredData;
}