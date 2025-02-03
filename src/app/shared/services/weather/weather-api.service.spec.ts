import {TestBed} from "@angular/core/testing";
import {WeatherApiService} from "./weather-api.service";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {WeatherApiServiceFixtures} from "./weather-api.service.fixtures";
import {provideHttpClient} from "@angular/common/http";

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherApiService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(WeatherApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getForecast', () => {
    it('should make the api call with corresponding params', (done) => {
      service.getForecast('1', '1').subscribe(({latitude, longitude}) => {
        expect(latitude).toEqual(1);
        expect(longitude).toEqual(1);
        done();
      });
      const request = httpController.expectOne({
        method: 'GET',
        url: `https://api.open-meteo.com/v1/forecast?latitude=1&longitude=1&current_weather=true`,
      });
      request.flush(WeatherApiServiceFixtures.weatherForecast);
    });
  });
});
