import {TestBed} from "@angular/core/testing";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {LocationApiService} from "./location-api.service";
import {LocationApiServiceFixtures} from "./location-api.service.fixtures";

describe('LocationApiService', () => {
  let service: LocationApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        LocationApiService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LocationApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getForecast', () => {
    it('should make the api call with corresponding params', (done) => {
      service.getLocationDetails('London').subscribe((results) => {
        results.forEach(({lat, lon}) => {
          expect(lat).toEqual("1");
          expect(lon).toEqual("1");
        });
        done();
      });
      const request = httpController.expectOne({
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/search?q=London&format=json`,
      });
      request.flush(LocationApiServiceFixtures.locationDetails);
    });
  });
});
