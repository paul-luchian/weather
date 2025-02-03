import {LocationDetailsDto} from "./location-api.models";

const locationDetails: LocationDetailsDto[] = [{
  place_id: 259827773,
  licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  osm_type: "relation",
  osm_id: 65606,
  lat: "1",
  lon: "1",
  class: "place",
  type: "city",
  place_rank: 16,
  importance: 0.8820890292539882,
  addresstype: "city",
  name: "Londra",
  display_name: "Londra, Greater London, Anglia, Regatul Unit al Marii Britanii și al Irlandei de Nord",
  boundingbox: ["51.2867601", "51.6918741", "-0.5103751", "0.3340155"]
}];

export const LocationApiServiceFixtures = {locationDetails};
