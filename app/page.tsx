"use client";

import mapboxgl, { type Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef } from "react";
import type { Fire } from "./fires/route";

export default function Home() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoibHVja3ljYWRvdyIsImEiOiJjams2eDJndHAwdXF6M3dwMHl1a2lydnZwIn0._P7S1N2ooWDlN5Ohxz9RgA",
      container: mapContainerRef.current,
      bounds: [
        [-102.03, 37],
        [-109.03, 41],
      ],
      fitBoundsOptions: { padding: 15 },
    });
    const map = mapRef.current;
    if (!map) return;

    fetch("/fires")
      .then((response) => response.json())
      .then((fires: Fire[]) => {
        fires.forEach((fire) => {
          new mapboxgl.Marker({
            element: document.createElement("div"),
            className: "marker",
          })
            .setLngLat([fire.longitude, fire.latitude])
            .setPopup(
              new mapboxgl.Popup().addClassName("popup").setHTML(
                `
                    <strong>${fire.title}</strong>
                    <p>${fire.description}</p>
                    <a href="${fire.link}" target="_blank">More info</a>
                `,
              ),
            )
            .addTo(map);
        });
      });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div className="map" ref={mapContainerRef} />;
}
