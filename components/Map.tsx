import React, { useLayoutEffect } from 'react';
import mapbox from 'mapbox-gl/dist/mapbox-gl.js';
import Head from 'next/head';
import styles from '../styles/Map.module.scss';
import { Fire } from '../pages/api/fires';

mapbox.accessToken =
  'pk.eyJ1IjoibHVja3ljYWRvdyIsImEiOiJjajMzaGh2aDQwMDZyMzJydW4ydnZjOHc4In0.NdM9UHVLDzOD_9lxhwCDhw';

export interface MapProps {
  fires: Fire[];
}

const Map: React.FC<MapProps> = ({ fires }) => {
  useLayoutEffect(() => {
    const map = new mapbox.Map({
      center: [-105.44100493749113, 38.97337437873844],
      zoom: 6,
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    fires.forEach((fire) => {
      const element = new Image(24, 24);
      element.src = '/fire.svg';
      const popup = new mapbox.Popup({
        closeButton: false,
        offset: 15,
      }).setHTML(`<h4>${fire.title}</h4>`);
      new mapbox.Marker({ element })
        .setLngLat([fire.longitude, fire.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    /* Used to get the coordinates of the map visually centered
    map.on('dragend', function () {
      console.log(map.getCenter());
    });
    */
  }, []);

  return (
    <>
      <Head key="mapbox">
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div id="mapbox-map" className={styles.map}></div>
    </>
  );
};

export default Map;
