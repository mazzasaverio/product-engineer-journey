import React, { useEffect, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";

interface OMIMapProps {
  center: { lat: number; lng: number };
  zonaOmi: string;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const OMIMap: React.FC<OMIMapProps> = ({ center, zonaOmi }) => {
  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number }[] | null
  >(null);

  // Carica l'API di Google Maps
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Assicurati di avere la chiave API nelle variabili d'ambiente
  });

  // Funzione per caricare le coordinate della zona OMI dal file JSON
  useEffect(() => {
    fetch("/omi/zone_omi.json")
      .then((response) => response.json())
      .then((data) => {
        const zona = data[zonaOmi];
        if (zona) {
          setCoordinates(zona.coordinates);
        } else {
          console.error(`Zona OMI ${zonaOmi} non trovata.`);
        }
      })
      .catch((error) =>
        console.error("Errore nel caricamento del file JSON:", error),
      );
  }, [zonaOmi]);

  const polygonOptions = {
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  console.log(polygonOptions);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {coordinates && <Polygon paths={coordinates} options={polygonOptions} />}
    </GoogleMap>
  ) : (
    <div>Caricamento della mappa...</div>
  );
};

export default OMIMap;
