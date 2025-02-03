import {TestBed} from "@angular/core/testing";
import {WeatherApiService} from "./weather-api.service";
import {WeatherService} from "./weather.service";
import {of} from "rxjs";
import {WeatherType} from "../../models/weather.models";
import {WeatherApiServiceFixtures} from "./weather-api.service.fixtures";

describe('WeatherService', () => {
  let service: WeatherService;
  let weatherApiServiceSpy: jasmine.SpyObj<WeatherApiService>;

  beforeEach(() => {
    weatherApiServiceSpy = jasmine.createSpyObj('WeatherApiService', ['getForecast']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        WeatherService,
        {provide: WeatherApiService, useValue: weatherApiServiceSpy}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(WeatherService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getForecast', () => {
    it('should return mapped weatherForecast', (done) => {
      weatherApiServiceSpy.getForecast.and.returnValue(of(WeatherApiServiceFixtures.weatherForecast));
      service.getForecast('1', '1').subscribe((response) => {
        expect(weatherApiServiceSpy.getForecast).toHaveBeenCalledWith("1", "1");
        const {
          type,
          temperature,
          temperatureUnit,
          humidity,
          humidityUnit,
          windSpeed,
          windSpeedUnit
        } = response;
        const expectedResponse = {
          type: WeatherType.PartlyCloudy,
          temperature: 8.6,
          temperatureUnit: '°C',
          humidity: 0,
          humidityUnit: '%',
          windSpeed: 11.2,
          windSpeedUnit: 'km/h',
        }
        expect({
          type,
          temperature,
          temperatureUnit,
          humidity,
          humidityUnit,
          windSpeed,
          windSpeedUnit
        }).toEqual(expectedResponse);
        done();
      });
    });
  });
});
