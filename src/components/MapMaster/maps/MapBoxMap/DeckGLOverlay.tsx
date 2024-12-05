
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { useControl } from 'react-map-gl';

export type DeckGLOverlayProps = MapboxOverlayProps;

export function DeckGLOverlay(props: MapboxOverlayProps) {
    const overlay = useControl(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

