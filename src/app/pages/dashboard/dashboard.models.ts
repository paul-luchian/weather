import {WeatherForecast} from "../../shared/services/weather/weather.models";
import {mapWeatherTypeTranslation, WeatherType} from "../../shared/models/weather.models";
import {WeatherUtils} from "../../shared/utils/weather.utils";
import {LocationDetails} from "../../shared/services/location/location.models";

export class DashboardViewModel {
  location: string;
  weather: string;
  temperature: string;
  humidity: string;
  windSpeed: string;

  constructor(locationDetails?: LocationDetails, weatherForecast?: WeatherForecast) {
    this.location = locationDetails?.displayName?.split(',')?.[0] || 'n/a';
    this.weather = weatherForecast ? this.buildWeatherString(weatherForecast.type) : 'n/a';
    this.temperature = weatherForecast ? `${weatherForecast.temperature} ${weatherForecast.temperatureUnit}` : 'n/a';
    this.humidity = weatherForecast ? `${weatherForecast.humidity} ${weatherForecast.humidityUnit}` : 'n/a';
    this.windSpeed = weatherForecast ? `${weatherForecast.windSpeed} ${weatherForecast.windSpeedUnit}` : 'n/a';
  }

  private buildWeatherString(type: WeatherType): string {
    const label = mapWeatherTypeTranslation[type] ?? 'Unknown';
    const icon = WeatherUtils.getWeatherIcon(type);
    return `${label} ${icon}`
  }
}
