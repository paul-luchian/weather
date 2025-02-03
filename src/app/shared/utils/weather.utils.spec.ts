import {WeatherUtils} from "./weather.utils";
import {WeatherType} from "../models/weather.models";

describe('WeatherUtils', () => {
  describe('getWeatherIcon', () => {
    it(`should return '☀' icon for ClearSky`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.ClearSky)).toEqual('☀');
    });

    it(`should return '⛅' icon for PartlyCloudy`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.PartlyCloudy)).toEqual('⛅');
    });

    it(`should return '🌫' icon for Fog`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Fog)).toEqual('🌫');
    });

    it(`should return '🌧' icon for Drizzle`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Drizzle)).toEqual('🌧');
    });

    it(`should return '🌧' icon for Rain`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Rain)).toEqual('🌧');
    });

    it(`should return '🌦' icon for Snowfall`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Snowfall)).toEqual('🌦');
    });

    it(`should return '🌦' icon for Showers`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Showers)).toEqual('🌦');
    });

    it(`should return '⛈' icon for Thunderstorm`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Thunderstorm)).toEqual('⛈');
    });

    it(`should return '?' icon for Unknown`, () => {
      expect(WeatherUtils.getWeatherIcon(WeatherType.Unknown)).toEqual('?');
    });


    it(`should return '?' icon for any other value`, () => {
      expect(WeatherUtils.getWeatherIcon(undefined as any)).toEqual('?');
    });
  });
});
