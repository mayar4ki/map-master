import { DeckLayer } from '@2gis/deck2gis-layer/dist/types/deckgl2gisLayer';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProvider } from '../enums/MapProvider';

export interface LatLngLiteral {
    /**
     * Latitude in degrees. Values will be clamped to the range [-90, 90]. This
     * means that if the value specified is less than -90, it will be set to
     * -90. And if the value is greater than 90, it will be set to 90.
     */
    lat: number;
    /**
     * Longitude in degrees. Values outside the range [-180, 180] will be
     * wrapped so that they fall within the range. For example, a value of -190
     * will be converted to 170. A value of 190 will be converted to -170. This
     * reflects the fact that longitudes wrap around the globe.
     */
    lon: number;
}


export interface MapMasterProps {

    mapProvide: MapProvider;

    layers: Array<DeckLayer>;

    defaultCenter?: LatLngLiteral;

    defaultZoom?: number;

    defaultPitch?: number;

    center?: LatLngLiteral;

    onCenterChanged?: (e: LatLngLiteral) => void

};
