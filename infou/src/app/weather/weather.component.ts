import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule, DatePipe, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  weatherData: any;
  dailyData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    let payload = {
      methodName: 'weather-getWeatherData',
    };
    let url = 'http://localhost:3000/app/commCall';

    this.http.post(url, payload).subscribe((data: any) => {
      this.weatherData = data;
      this.dailyData = data.daily.time.map((date: string, i: number) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[i],
        minTemp: data.daily.temperature_2m_min[i],
        rain: data.daily.rain_sum[i],
        windSpeed: data.daily.wind_speed_10m_max[i],
        windDir: data.daily.wind_direction_10m_dominant[i],
      }));
    });
  }
}
