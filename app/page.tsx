"use client";

import { Fire } from "@/utils/fires";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef } from "react";

export default function Home() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoibHVja3ljYWRvdyIsImEiOiJja2lqMmZycTkwcmxrMnJ1ZnhnY3d5YmdrIn0.w9HXsKVi4YAI5BrlDP43hQ",
      container: mapContainerRef.current,
      bounds: [
        [-102.03, 37],
        [-109.03, 41],
      ],
      fitBoundsOptions: { padding: 15 },
    });

    fetch("/fires")
      .then((response) => response.json())
      .then((fires: Fire[]) => {
        fires.forEach((fire) => {
          const marker = new mapboxgl.Marker({})
            .setLngLat([fire.longitude, fire.latitude])
            .addTo(mapRef.current!)
            .setPopup(
              new mapboxgl.Popup()
                .setHTML(
                  `
                  <strong>${fire.title}</strong>
                  <p>${fire.description}</p>
                  <a href="${fire.link}" target="_blank" class="text-blue-600 outline-none">More info</a>
                  `
                )
                .addClassName("rounded-lg p-2 text-black")
            );
          marker.getElement();
        });
      });

    return mapRef.current?.remove;
  }, []);

  return <div className="h-full max-h-full text" ref={mapContainerRef} />;
}
