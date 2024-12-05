
import { GoogleMapsOverlay, GoogleMapsOverlayProps } from '@deck.gl/google-maps/typed';
import { useMap as useGoogleMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';



export type DeckGLOverlayProps = GoogleMapsOverlayProps
/**
 * A very simple implementation of a component that renders a list of deck.gl layers
 * via the GoogleMapsOverlay into the <Map> component containing it.
 */
export const DeckGLOverlay = (props: DeckGLOverlayProps) => {
    // the GoogleMapsOverlay can persist throughout the lifetime of the DeckGlOverlayGoogle
    const deck = useMemo(() => new GoogleMapsOverlay(props), []);

    // add the overlay to the map once the map is available
    const map = useGoogleMap();
    useEffect(() => {
        deck.setMap(map);
        return () => deck.setMap(null);
    }, [deck, map]);

    // whenever the rendered data changes, the layers will be updated
    deck.setProps(props);

    // no dom rendered by this component
    return null;
};