import {WeatherForecastDto} from "./weather-api.models";
import {WeatherType} from "../../models/weather.models";

export class WeatherForecast {
  type: WeatherType;
  temperature: number;
  temperatureUnit: string;
  humidity: number;
  humidityUnit: string;
  windSpeed: number;
  windSpeedUnit: string;

  constructor(dto: WeatherForecastDto) {
    this.type = mapWeatherCodeToWeatherForecast(dto.current_weather.weathercode);
    this.temperature = dto.current_weather.temperature;
    this.temperatureUnit = dto.current_weather_units.temperature;
    this.windSpeed = dto.current_weather.windspeed;
    this.windSpeedUnit = dto.current_weather_units.windspeed;
    this.humidity = 0;
    this.humidityUnit = '%';
  }
}

export const mapWeatherCodeToWeatherForecast = (value: number): WeatherType => {
  if (value === 0) {
    return WeatherType.ClearSky;
  } else if (value >= 1 && value <= 3) {
    return WeatherType.PartlyCloudy;
  } else if (value >= 45 && value <= 48) {
    return WeatherType.Fog;
  } else if (value >= 51 && value <= 57) {
    return WeatherType.Drizzle;
  } else if (value >= 61 && value <= 67) {
    return WeatherType.Rain;
  } else if (value >= 71 && value <= 77) {
    return WeatherType.Snowfall;
  } else if (value >= 80 && value <= 82) {
    return WeatherType.Showers;
  } else if (value >= 95 && value <= 99) {
    return WeatherType.Thunderstorm;
  }
  return WeatherType.Unknown;
}
