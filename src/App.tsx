import { PathLayer } from '@deck.gl/layers/typed';
import { ScenegraphLayer } from '@deck.gl/mesh-layers/typed';
import { HexagonLayer } from 'deck.gl/typed';
import { useMemo, useState } from 'react';
import { MapMaster } from './components/MapMaster';
import { MapProvider } from './components/MapMaster/enums/MapProvider';
import { trips as _trips } from './data/trips';
import TripBuilder from './utils/trip-builder';



const center = {
  //lon: 55.31878, lat: 25.23584
  lon: -95.36403, lat: 29.756433
}


export default function App() {
  const [selectedMap, setSelectedMap] = useState<MapProvider>(MapProvider.URBI_CANVAS);
  const [animation, setAnimation] = useState(0.02);
  const [shapeLocation, setShapeLocation] = useState({
    lon: 55.31878,
    lat: 25.23584,
  });

  const trips = _trips.map(waypoints => new TripBuilder({ waypoints, loop: true }));


  const hexagon = useMemo(() => new HexagonLayer({
    id: 'hexagon-layer',
    type: HexagonLayer,
    data: [
      {
        point: shapeLocation
      },
    ],
    antialiasing: true,
    parameters: { depthTest: true },
    radius: 480,
    getPosition: (d: any) => [d.point.lon, d.point.lat],
  }), [shapeLocation, selectedMap])

  const path = useMemo(() => new PathLayer({
    id: 'path-layer',
    type: PathLayer,
    data: trips,
    getPath: d => d.keyframes.map((f: any) => f.point),
    getColor: _ => [76, 175, 80],
    jointRounded: true,
    opacity: 0.5,
    getWidth: 4
  }), [selectedMap]);

  const car = useMemo(() => new ScenegraphLayer({
    id: "scene-graph-layer",
    type: ScenegraphLayer,
    data: trips.map(trip => trip.getFrame(animation)),
    scenegraph: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/google-3d/truck.gltf",
    sizeScale: 6,
    getPosition: d => d.point,
    getTranslation: [0, 0, 5],
    getOrientation: d => [0, 180 - d.heading, 90],
    _lighting: 'pbr',
  }), [animation, selectedMap])


  return (
    <div>
      <div style={{ margin: 20 }}>
        {Object.values(MapProvider).map(el => <button
          key={el}
          onClick={() => {
            setSelectedMap(el)
          }}
          style={{
            backgroundColor: el !== selectedMap ? '#ADD8E6' : '#FF7F7F',
            boxShadow: el === selectedMap ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none',
            borderRadius: 5,
            paddingInline: 16,
            paddingBlock: 5,
            marginRight: 10,
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {el.replaceAll("_", " ")}
        </button>)}

        <button
          style={{
            borderRadius: 5,
            paddingInline: 16,
            paddingBlock: 5,
            marginRight: 10,
            textTransform: 'uppercase',
            border: 'none',
            backgroundColor: 'gold',
            cursor: 'pointer'

          }}
          onClick={() => {
            let ms = 0;
            while (ms < 5000000) {
              setTimeout(() => {
                setAnimation(i => i + 0.1)
              }, ms);
              ms = ms + 100
            }
          }}
        >
          Play
        </button>
      </div>


      <div style={{
        display: 'flex', flex: 1,
        height: '850px', margin: 4,
        marginTop: 20, position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }} >

        <MapMaster
          mapProvide={selectedMap}
          layers={[hexagon, path, car]}
          defaultCenter={center}
          defaultZoom={17}
          defaultPitch={40}
        >

        </MapMaster>

      </div>
    </div>
  );
}


