import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationDetailsDto} from "./location-api.models";

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {
  readonly #baseUrl = 'https://nominatim.openstreetmap.org';
  readonly #httpClient = inject(HttpClient);

  getLocationDetails(query: string, format: string = 'json'): Observable<LocationDetailsDto[]> {
    const queryObj = {
      q: query,
      format
    };
    return this.#httpClient.get<LocationDetailsDto[]>(`${this.#baseUrl}/search`, {params: new HttpParams({fromObject: queryObj})})
  }
}
