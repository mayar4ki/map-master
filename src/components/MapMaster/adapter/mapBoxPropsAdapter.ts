import { MapBoxMapProps } from "../maps/MapBoxMap";
import { MapMasterProps } from "../types";

export const mapBoxPropsAdapter = (props: MapMasterProps): MapBoxMapProps => {

    return {

        initialViewState: {
            longitude: props?.defaultCenter?.lon, latitude: props?.defaultCenter?.lat,
            zoom: props.defaultZoom,
            pitch: props.defaultPitch
        },
        longitude: props.center.lon,
        latitude: props.center.lat,
        onMove(e) {
            props?.onCenterChanged?.({
                lat: e.viewState.latitude,
                lon: e.viewState.longitude
            })
        },
        slotProps: {
            deckGLOverlay: {
                layers: props.layers
            }
        }

    }
}