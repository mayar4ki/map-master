import 'mapbox-gl/dist/mapbox-gl.css';
import { googleMapPropsAdapter } from './adapter/googleMapPropsAdapter';
import { mapBoxPropsAdapter } from './adapter/mapBoxPropsAdapter';
import { tileMapPropsAdapter } from './adapter/tileMapPropsAdapter';
import { urbiMapPropsAdapter } from './adapter/urbiMapPropsAdapter';
import { MapProvider } from './enums/MapProvider';
import { GoogleMap } from './maps/GoogleMap';
import { MapBoxMap } from './maps/MapBoxMap';
import { TileMap } from './maps/TileMap';
import { UrbiMap } from './maps/UrbiMap';
import { MapMasterProps } from './types';


export const MapMaster = (props: MapMasterProps) => {
    const { mapProvide } = props;

    switch (mapProvide) {
        case MapProvider.URBI_CANVAS:
            return <UrbiMap
                {...urbiMapPropsAdapter(props)}
            />

        case MapProvider.GOOGLE_CANVAS:
            return <GoogleMap
                center={{ lat: 0, lng: 0 }}
                {...googleMapPropsAdapter(props)}
            />
        case MapProvider.MAP_BOX_CANVAS:
            return <MapBoxMap
                mapStyle="mapbox://styles/mapbox/light-v9"
                antialias
                {...mapBoxPropsAdapter(props)}
            />
        case MapProvider.MAP_BOX_CANVAS_WITH_BUILDINGS:
            return <MapBoxMap
                mapStyle="mapbox://styles/mapbox/light-v9"
                antialias
                buildingsLayer
                {...mapBoxPropsAdapter(props)}
            />
        case MapProvider.OSM_TILE:
            return <TileMap
                key={MapProvider.OSM_TILE}
                mapProvider={MapProvider.OSM_TILE}
                tileSRC={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                {...tileMapPropsAdapter(props)}
            />

        case MapProvider.GOOGLE_TILE:
            return <TileMap
                key={MapProvider.GOOGLE_TILE}
                mapProvider={MapProvider.GOOGLE_TILE}
                tileSRC={'https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'}
                {...tileMapPropsAdapter(props)}
            >
            </TileMap>
        default:
            return null;
    };
}
