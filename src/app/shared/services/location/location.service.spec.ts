import {TestBed} from "@angular/core/testing";
import {of} from "rxjs";
import {LocationService} from "./location.service";
import {LocationApiService} from "./location-api.service";
import {LocationApiServiceFixtures} from "./location-api.service.fixtures";

describe('LocationService', () => {
  let service: LocationService;
  let locationApiServiceSpy: jasmine.SpyObj<LocationApiService>;

  beforeEach(() => {
    locationApiServiceSpy = jasmine.createSpyObj('LocationApiService', ['getLocationDetails']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LocationService,
        {provide: LocationApiService, useValue: locationApiServiceSpy}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LocationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocationDetails', () => {
    it('should return mapped locationDetails', (done) => {
      locationApiServiceSpy.getLocationDetails.and.returnValue(of(LocationApiServiceFixtures.locationDetails));
      service.getLocationDetails('London').subscribe((response) => {
        expect(locationApiServiceSpy.getLocationDetails).toHaveBeenCalledWith('London');
        const {
          latitude,
          longitude,
          displayName,
        } = response!;
        const expectedResponse = {
          latitude: "1",
          longitude: "1",
          displayName: "Londra, Greater London, Anglia, Regatul Unit al Marii Britanii și al Irlandei de Nord",
        }
        expect({
          latitude,
          longitude,
          displayName,
        }).toEqual(expectedResponse);
        done();
      });
    });
  });
});
