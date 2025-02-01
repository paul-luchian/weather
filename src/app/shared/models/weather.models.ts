export enum WeatherType {
  ClearSky = 'ClearSky',
  PartlyCloudy = 'PartlyCloudy',
  Fog = 'Fog',
  Drizzle = 'Drizzle',
  Rain = 'Rain',
  Snowfall = 'Snowfall',
  Showers = 'Showers',
  Thunderstorm = 'Thunderstorm',
  Unknown = 'Unknown'
}

export const mapWeatherTypeTranslation = {
  [WeatherType.ClearSky]: 'Clear sky',
  [WeatherType.PartlyCloudy]: 'Partly cloudy',
  [WeatherType.Fog]: 'Fog',
  [WeatherType.Drizzle]: 'Drizzle',
  [WeatherType.Rain]: 'Rain',
  [WeatherType.Snowfall]: 'Snowfall',
  [WeatherType.Showers]: 'Showers',
  [WeatherType.Thunderstorm]: 'Thunderstorm',
  [WeatherType.Unknown]: 'Unknown',
};
