import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherForecastDto} from "./weather-api.models";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  readonly #baseUrl = 'https://api.open-meteo.com/v1';
  readonly #httpClient = inject(HttpClient);

  getForecast(latitude: string, longitude: string, currentWeather: boolean = true): Observable<WeatherForecastDto> {
    const queryObj = {
      latitude,
      longitude,
      current_weather: currentWeather
    };
    return this.#httpClient.get<WeatherForecastDto>(`${this.#baseUrl}/forecast`, {params: new HttpParams({fromObject: queryObj})})
  }
}
