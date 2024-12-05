import { Deck2gisLayer, type initDeck } from "@2gis/deck2gis-layer";
import { DeckLayer } from "@2gis/deck2gis-layer/dist/types/deckgl2gisLayer";

export const layerAdapter = (layer: DeckLayer, deck: ReturnType<typeof initDeck>) => {
    return new Deck2gisLayer<any>({
        id: layer.id,
        deck,
        ...layer.props,
        data: layer.props.data,
    });
}