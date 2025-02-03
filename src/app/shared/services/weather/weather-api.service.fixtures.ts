import {WeatherForecastDto} from "./weather-api.models";

const weatherForecast: WeatherForecastDto = {
  latitude: 1,
  longitude: 1,
  generationtime_ms: 0.033855438232421875,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 16.0,
  current_weather_units: {
    time: "iso8601",
    interval: "seconds",
    temperature: "°C",
    windspeed: "km/h",
    winddirection: "°",
    is_day: "",
    weathercode: "wmo code"
  },
  current_weather: {
    time: "2025-02-03T14:45",
    interval: 900,
    temperature: 8.6,
    windspeed: 11.2,
    winddirection: 201,
    is_day: 1,
    weathercode: 3
  }
}

export const WeatherApiServiceFixtures = {
  weatherForecast
};
