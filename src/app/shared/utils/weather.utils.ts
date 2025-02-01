import {WeatherType} from "../models/weather.models";

const getWeatherIcon = (weatherType: WeatherType): string => {
  switch (weatherType) {
    case WeatherType.ClearSky:
      return '☀';
    case WeatherType.PartlyCloudy:
      return '⛅';
    case WeatherType.Fog:
      return '🌫';
    case WeatherType.Drizzle:
      return '🌧';
    case WeatherType.Rain:
      return '🌧';
    case WeatherType.Snowfall:
      return '🌦';
    case WeatherType.Showers:
      return '🌦';
    case WeatherType.Thunderstorm:
      return '⛈';
    default:
      return '?';
  }
};

export const WeatherUtils = {getWeatherIcon};
