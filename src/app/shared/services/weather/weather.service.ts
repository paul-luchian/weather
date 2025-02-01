import {inject, Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {WeatherApiService} from "./weather-api.service";
import {WeatherForecast} from "./weather.models";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly #api = inject(WeatherApiService);

  getForecast(latitude: string, longitude: string): Observable<WeatherForecast> {
    return this.#api.getForecast(latitude, longitude).pipe(
      map((dto) => new WeatherForecast(dto))
    );
  }
}
