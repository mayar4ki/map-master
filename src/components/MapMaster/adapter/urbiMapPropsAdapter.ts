import { UrbiMapProps } from "../maps/UrbiMap";
import { MapMasterProps } from "../types";

export const urbiMapPropsAdapter = (props: MapMasterProps): UrbiMapProps => {

    return {
        options: {
            ...(props.defaultCenter && { center: [props.defaultCenter.lon, props.defaultCenter.lat] }),
            zoom: typeof props.defaultZoom === 'number' ? props.defaultZoom + 1 : undefined,
            pitch: props.defaultPitch
        },
        slotProps: {
            deckGLOverlay: {
                layers: props.layers,
                onViewStateChange(params) {
                    console.log('first', params)
                },
            }
        }
    }
}