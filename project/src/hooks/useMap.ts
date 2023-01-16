import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, Marker, TileLayer } from 'leaflet';
import {LocationCoordinates} from '../types/booking-type';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: LocationCoordinates): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRefRendered = useRef<boolean>(false);

  useEffect(
    () => {
      if (isRefRendered.current && map)
      {
        map.eachLayer((layer) => {
          if (layer instanceof Marker) {
            layer.remove();
          }
        });
        map.setView([city[0].coords[0], city[0].coords[1]], map.getZoom(), );
      }

      if (mapRef.current !== null && !isRefRendered.current)
      {
        const instance = new Map(mapRef.current, {
          center: {
            lat: city[0].coords[0],
            lng: city[0].coords[1],
          },
          zoom: 10
        });

        const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          });
        instance.addLayer(layer);
        setMap(instance);

        isRefRendered.current = true;
      }
    }, [mapRef, city]);

  return map;
}
