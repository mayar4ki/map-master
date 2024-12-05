import { GoogleMapProps } from "../maps/GoogleMap";
import { MapMasterProps } from "../types";

export const googleMapPropsAdapter = (props: MapMasterProps): GoogleMapProps => {

    return {
        defaultZoom: typeof props.defaultZoom === 'number' ? props.defaultZoom + 1 : undefined,
        defaultTilt: props.defaultPitch,
        ...(props.defaultCenter && {
            defaultCenter: {
                lat: props.defaultCenter?.lat,
                lng: props.defaultCenter?.lon
            }
        }),
        ...(props.center && { center: { lat: props.center.lat, lng: props.center.lon } }),
        ...(typeof props.onCenterChanged === 'function' && {
            onCenterChanged(event) {
                props.onCenterChanged({
                    lat: event.detail.center.lat,
                    lon: event.detail.center.lng
                })
            },
        }),

        slotProps: {
            deckGLOverlay: {
                layers: props.layers
            }
        }
    }
}