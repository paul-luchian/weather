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
import {DashboardViewModel} from "./dashboard.models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
  viewModel?: DashboardViewModel = new DashboardViewModel();

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
    const searchEvent = this.dashboardHeader.searchCtrl.valueChanges.pipe(
      debounceTime(1000),
      filter((searchString) => {
        if (!searchString.trim()) {
          this.viewModel = new DashboardViewModel();
          this.isLoading = false;
          this.#cdr.markForCheck();
        }
        return !!searchString.trim();
      })
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
          this.#weatherService.getForecast(locationDetails!.latitude, locationDetails!.longitude)
            .pipe(
              tap((weatherForecast) => {
                this.viewModel = new DashboardViewModel(locationDetails!, weatherForecast);
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
