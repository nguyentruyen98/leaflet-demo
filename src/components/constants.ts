import { CRS, type LatLngBoundsExpression, type MapOptions } from "leaflet";

export const MAP_BOUNDS: LatLngBoundsExpression = [
  [0, 0],
  [700, 1635],
];

export const MAP_OPTIONS: MapOptions = {
  crs: CRS.Simple,
  attributionControl: false,
  center: [250, 500], // Center of the map
  //   maxBounds: MAP_BOUNDS,
  minZoom: -5,
};
