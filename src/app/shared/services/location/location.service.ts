import {inject, Injectable} from "@angular/core";
import {LocationApiService} from "./location-api.service";
import {map, Observable} from "rxjs";
import {LocationDetailsDto} from "./location-api.models";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly #api = inject(LocationApiService);

  getLocationDetails(query: string): Observable<LocationDetailsDto | undefined> {
    return this.#api.getLocationDetails(query).pipe(
      map((dtos) => dtos?.[0])
    );
  }
}
