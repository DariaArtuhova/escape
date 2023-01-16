import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import { BookingType, LocationCoordinates} from '../../types/booking-type';

type MapProps = {
  address: LocationCoordinates;
  points?: BookingType[];
  selectedPoint?: BookingType | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {address, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, address);

  useEffect(() => {
    if (map) {
      address.forEach((point) => {
        const marker = new Marker({
          lat: point.coords[0],
          lng: point.coords[1]
        });


        marker
          .setIcon(
            selectedPoint !== undefined &&
            point.coords === selectedPoint.locations[0].coords &&
            point.coords === selectedPoint.locations[0].coords
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);


      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '529px'}} ref={mapRef}></div>;
}

export default Map;
