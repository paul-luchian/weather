import {inject, Injectable} from "@angular/core";
import {LocationApiService} from "./location-api.service";
import {map, Observable} from "rxjs";
import {LocationDetails} from "./location.models";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly #api = inject(LocationApiService);

  getLocationDetails(query: string): Observable<LocationDetails | undefined> {
    return this.#api.getLocationDetails(query).pipe(
      map((dtos) => dtos?.[0] ? new LocationDetails(dtos[0]) : undefined)
    );
  }
}
