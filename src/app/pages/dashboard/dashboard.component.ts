import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  ViewChild
} from "@angular/core";
import {DashboardHeaderComponent} from "./components/dashboard-header/dashboard-header.component";
import {debounceTime, filter, fromEvent, merge, Subject, switchMap, takeUntil, tap} from "rxjs";
import {LocationService} from "../../shared/services/location/location.service";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {NotificationService} from "../../shared/services/notification/notification.service";
import {JsonPipe, NgIf} from "@angular/common";
import {DashboardViewModel} from "./components/dashboard.models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    DashboardHeaderComponent,
    JsonPipe,
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  @ViewChild(DashboardHeaderComponent) dashboardHeader!: DashboardHeaderComponent;

  isLoading = false;
  weatherData?: DashboardViewModel;

  readonly #cdr = inject(ChangeDetectorRef);
  readonly #notificationService = inject(NotificationService);
  readonly #locationService = inject(LocationService);
  readonly #weatherService = inject(WeatherService);
  readonly #onDestroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    const searchEnterEvent = fromEvent<KeyboardEvent>(this.dashboardHeader.searchInputRef.nativeElement, 'keypress')
      .pipe(
        filter((e) => e.keyCode === 13)
      );
    const searchEvent =  this.dashboardHeader.searchCtrl.valueChanges.pipe(
      debounceTime(1000),
    );
    merge(
      searchEnterEvent,
      searchEvent
    )
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.#cdr.markForCheck();
        }),
        switchMap(() =>
          this.#locationService.getLocationDetails((this.dashboardHeader.searchValue || '').trim())
            .pipe(
              filter((locationDetails) => {
                if (!locationDetails) {
                  this.#notificationService.error("Location could not be found!");
                  this.isLoading = false;
                  this.#cdr.markForCheck();
                }
                return !!locationDetails;
              })
            )
        ),
        switchMap((locationDetails) =>
          this.#weatherService.getForecast(locationDetails!.lat, locationDetails!.lon)
            .pipe(
              tap((weatherForecast) => {
                this.weatherData = new DashboardViewModel(locationDetails!, weatherForecast);
              })
            )
        ),
        tap(() => {
          this.isLoading = false;
          this.#cdr.markForCheck();
        }),
        takeUntil(this.#onDestroy$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.#onDestroy$.next();
    this.#onDestroy$.complete();
  }
}
