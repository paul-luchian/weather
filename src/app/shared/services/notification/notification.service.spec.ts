import {TestBed} from "@angular/core/testing";
import {NotificationService} from "./notification.service";

describe('WeatherApiService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NotificationService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('error', () => {
    it('should display error', () => {
      const alertSpy = spyOn(window, 'alert');
      service.error('testErrorMessage');
      expect(alertSpy).toHaveBeenCalledWith('testErrorMessage')
    });
  });
});
