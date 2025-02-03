import {LocationDetailsDto} from "./location-api.models";

export class LocationDetails {
  latitude: string;
  longitude: string;
  displayName: string;

  constructor(dto: LocationDetailsDto) {
    this.latitude = dto.lat;
    this.longitude = dto.lon;
    this.displayName = dto.display_name;
  }
}
