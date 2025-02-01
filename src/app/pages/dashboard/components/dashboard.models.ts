import {LocationDetailsDto} from "../../../shared/services/location/location-api.models";
import {WeatherForecast} from "../../../shared/services/weather/weather.models";
import {mapWeatherTypeTranslation, WeatherType} from "../../../shared/models/weather.models";
import {WeatherUtils} from "../../../shared/utils/weather.utils";

export class DashboardViewModel {
  location: string;
  weather: string;
  temperature: string;
  humidity: string;
  windSpeed: string;

  constructor(locationDetails: LocationDetailsDto, weatherForecast: WeatherForecast) {
    this.location = locationDetails.display_name;
    this.weather = this.buildWeatherString(weatherForecast.type);
    this.temperature = `${weatherForecast.temperature} ${weatherForecast.temperatureUnit}`;
    this.humidity = `${weatherForecast.humidity} ${weatherForecast.humidityUnit}`;
    this.windSpeed = `${weatherForecast.windSpeed} ${weatherForecast.windSpeedUnit}`;
  }

  private buildWeatherString(type: WeatherType): string {
    const label = mapWeatherTypeTranslation[type] ?? 'Unknown';
    const icon = WeatherUtils.getWeatherIcon(type);
    return `${label} ${icon}`
  }
}
