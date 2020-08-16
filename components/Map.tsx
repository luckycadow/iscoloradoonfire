import React, { useLayoutEffect, useEffect, useRef } from 'react';
import mapbox from 'mapbox-gl/dist/mapbox-gl.js';
import styles from '../styles/Map.module.scss';
import { Fire } from '../pages/api/fires';

mapbox.accessToken =
  'pk.eyJ1IjoibHVja3ljYWRvdyIsImEiOiJjajMzaGh2aDQwMDZyMzJydW4ydnZjOHc4In0.NdM9UHVLDzOD_9lxhwCDhw';

export interface MapProps {
  fires: Fire[];
  selectedFire?: Fire;
}

const Map: React.FC<MapProps> = ({ fires, selectedFire }) => {
  const markers = useRef<mapboxgl.Marker[]>([]);

  useLayoutEffect(() => {
    const map = new mapbox.Map({
      bounds: [
        [-102.03, 37],
        [-109.03, 41],
      ],
      fitBoundsOptions: { padding: 15 },
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    fires.forEach((fire) => {
      const element = new Image(24, 24);
      element.alt = fire.title;
      element.src = '/fire.svg';
      const popup = new mapbox.Popup({
        closeButton: false,
        offset: 15,
      }).setHTML(`<h4>${fire.title}</h4>`);
      const marker = new mapbox.Marker({ element })
        .setLngLat([fire.longitude, fire.latitude])
        .setPopup(popup)
        .addTo(map);
      marker.id = fire.id;
      markers.current.push(marker);
    });
  }, []);

  useEffect(() => {
    markers.current.forEach((m) => {
      const popup = m.getPopup();
      if (selectedFire?.id === (m as any).id && !popup.isOpen()) {
        m.togglePopup();
      } else if (popup.isOpen()) {
        m.togglePopup();
      }
    });
  }, [selectedFire]);

  return (
    <div className={styles['map-container']}>
      <div id="mapbox-map" className={styles.map}></div>
      <div className={styles.fade}></div>
    </div>
  );
};

export default Map;
