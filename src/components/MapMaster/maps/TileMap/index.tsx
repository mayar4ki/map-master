import { DeckGL, DeckGLProps, DeckGLRef } from '@deck.gl/react/typed';
import { BitmapLayer, MapView, TileLayer } from "deck.gl/typed";
import { useEffect, useRef } from 'react';
import { MapProvider } from '../../enums/MapProvider';


export interface TileMapProps {
  /**
   * @example https://tile.openstreetmap.org/{z}/{x}/{y}.png
   * @example https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}
   */
  tileSRC: string
  slotProps: {
    deckGl: DeckGLProps
  }
  mapProvider: MapProvider
}


export const TileMap = (props: TileMapProps) => {

  const { tileSRC } = props;

  const tileLayer = new TileLayer<ImageBitmap>({
    data: [tileSRC],
    maxRequests: 20,
    pickable: true,
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: props => {
      const [[west, south], [east, north]] = props.tile.boundingBox;
      const { data, ...otherProps } = props;

      return [
        new BitmapLayer(otherProps, {
          image: data,
          bounds: [west, south, east, north]
        })
      ];
    }
  });

  const deckRef2 = useRef<DeckGLRef>(null);
  useEffect(() => {


    return () => {

      deckRef2.current?.deck?.finalize()

    }
  }, [])
  return (
    <DeckGL
      ref={deckRef2}
      views={new MapView({ repeat: true })}
      controller={true}
      {...props.slotProps.deckGl}
      layers={[tileLayer, ...(props.slotProps?.deckGl?.layers ?? [])]}
    />
  )
}
