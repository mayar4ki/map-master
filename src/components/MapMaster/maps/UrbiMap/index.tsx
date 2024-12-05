import { initDeck } from '@2gis/deck2gis-layer';
import { load } from '@2gis/mapgl';
import { Map, MapOptions } from '@2gis/mapgl/types';
import { Deck, DeckProps } from 'deck.gl/typed';
import { useEffect, useRef } from 'react';
import { env } from '../../../../env';
import { MapWrapper } from './MapWrapper';
import { layerAdapter } from './utils/layerAdapter';

export interface UrbiMapProps {
    options: MapOptions;
    slotProps?: {
        deckGLOverlay?: DeckProps
    }
}


export const UrbiMap = (props: UrbiMapProps) => {

    const deckRef = useRef<ReturnType<typeof initDeck> | null>(null);
    const mapRef = useRef<Map | null>(null);


    const renderLayers = () => {

        if (mapRef.current && deckRef.current) {
            const layersCount = deckRef?.current?.props.layers.length ?? 0;

            if (layersCount === 0) {
                props.slotProps?.deckGLOverlay?.layers?.forEach(deckLayer => {
                    const gisLayer = layerAdapter(deckLayer, deckRef.current!);
                    mapRef.current?.removeLayer(gisLayer.id);
                    mapRef.current?.addLayer(gisLayer);
                });
            }

            deckRef.current?.setProps(props?.slotProps?.deckGLOverlay as never)
        }

    }


    useEffect(() => {
        renderLayers();
    }, [props?.slotProps?.deckGLOverlay?.layers])


    useEffect(() => {
        load().then(mapgl => {
            mapRef.current = new mapgl.Map('map-container', {
                ...props.options,
                key: env.URBI_API_KEY,
            });

            mapRef.current.on('styleload', () => {
                deckRef.current = initDeck(mapRef.current!, Deck, { antialiasing: 'msaa' });
                renderLayers();
            })



        })
        return () => {
            mapRef.current?.destroy();
        }
    }, []);

    return <MapWrapper />
}

