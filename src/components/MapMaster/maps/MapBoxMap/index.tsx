import 'mapbox-gl/dist/mapbox-gl.css';
import { Layer, Map } from 'react-map-gl';
import { env } from '../../../../env';
import { DeckGLOverlay, type DeckGLOverlayProps } from './DeckGLOverlay';

export type MapBoxMapProps = Parameters<typeof Map>[0] & {
    slotProps?: {
        deckGLOverlay?: DeckGLOverlayProps
    }
    buildingsLayer?: boolean;
}


export const MapBoxMap = ({ slotProps, buildingsLayer, ...rest }: MapBoxMapProps) => {

    return (
        <Map
            mapboxAccessToken={env.MAPBOX_TOKEN}
            {...rest}
        >
            <DeckGLOverlay {...slotProps?.deckGLOverlay} />
            {buildingsLayer && <Layer {...{
                source: 'composite',
                'source-layer': 'building',
                filter: ['==', 'extrude', 'true'],
                type: 'fill-extrusion',
                paint: {
                    'fill-extrusion-color': '#ccc',
                    'fill-extrusion-height': ['get', 'height']
                }
            }} />}
        </Map>)
}
