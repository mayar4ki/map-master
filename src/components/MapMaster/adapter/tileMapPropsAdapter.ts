import { TileMapProps } from "../maps/TileMap";
import { MapMasterProps } from "../types";

export const tileMapPropsAdapter = (props: MapMasterProps): Omit<TileMapProps, 'key' | 'mapProvider' | 'tileSRC'> => {

    return {

        slotProps: {
            deckGl: {
                initialViewState: {
                    longitude: props?.defaultCenter?.lon, latitude: props?.defaultCenter?.lat,
                    zoom: props.defaultZoom,
                    maxZoom: 20,
                    maxPitch: 0,
                    pitch: props.defaultPitch
                },
                layers: props.layers,
                onViewStateChange(e) {
                    props?.onCenterChanged?.({
                        lat: e.viewState.latitude,
                        lon: e.viewState.longitude
                    })
                },
            }
        }

    }
}