import { APIProvider, Map, MapProps } from '@vis.gl/react-google-maps';
import { env } from '../../../../env';
import { DeckGLOverlay, type DeckGLOverlayProps } from './DeckGLOverlay';


export interface GoogleMapProps extends MapProps {
    slotProps?: {
        deckGLOverlay?: DeckGLOverlayProps
    }
}


export const GoogleMap = ({ slotProps, ...rest }: GoogleMapProps) => {
    return (
        <APIProvider apiKey={env.GOOGLE_MAPS_API_KEY}>
            <Map
                {...rest}
                mapId={env.GOOGLE_MAP_ID}
            >
                <DeckGLOverlay {...slotProps?.deckGLOverlay} />
            </Map>
        </APIProvider>)
}
