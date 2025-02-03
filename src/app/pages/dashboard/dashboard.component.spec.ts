import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from "./dashboard.component";
import {ChangeDetectorRef} from "@angular/core";
import {NotificationService} from "../../shared/services/notification/notification.service";
import {LocationService} from "../../shared/services/location/location.service";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {Observable, Subject} from "rxjs";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let locationServiceStub: {
    getLocationDetails$: Subject<unknown>;
    getLocationDetails: () => Observable<unknown>;
  };

  let weatherServiceStub: {
    getForecast$: Subject<unknown>;
    getForecast: () => Observable<unknown>;
  };

  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    locationServiceStub = {
      getLocationDetails$: new Subject<unknown>(),
      getLocationDetails: function () {
        return this.getLocationDetails$.asObservable();
      }
    };

    weatherServiceStub = {
      getForecast$: new Subject<unknown>(),
      getForecast: function () {
        return this.getForecast$.asObservable();
      }
    };

    cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['error']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {provide: ChangeDetectorRef, useValue: cdrSpy},
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: LocationService, useValue: locationServiceStub},
        {provide: WeatherService, useValue: weatherServiceStub},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
