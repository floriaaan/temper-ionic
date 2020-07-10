import React, { useState, useEffect } from "react";

import "./Map.css";

import {
  IonContent,
  IonSkeletonText,
} from "@ionic/react";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ContainerProps {
  user: number;
}

const MapComponent: React.FC<ContainerProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [gpsArray, setGPSArray] = useState([
    {
      lon: 0,
      lat: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "http://" + window.location.hostname + ":8000/api/v1/probe/user/" + user
      )
        .then((res) => res.json())
        .then((res) => {
          res.response.data.forEach((id: number) => {
            fetch(
              "http://" + window.location.hostname + ":8000/api/v1/probe/" + id
            )
              .then((res) => res.json())
              .then((res) => {
                if(res.response.data.gps.lon && res.response.data.gps.lat) {
                    setGPSArray([...gpsArray, res.response.data.gps]);
                }
                
              });
          });
          setLoading(false);
        });
    }

    fetchData();
  }, [user]);

  return (
    <IonContent>
      {!loading ? (
        <>
          <Map center={[43, 1]} zoom={3}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {gpsArray.map((id, key) => {
              return (
                <React.Fragment key={key}>
                  <Marker
                    position={[gpsArray[key].lon, gpsArray[key].lat]}
                  ></Marker>
                </React.Fragment>
              );
            })}
          </Map>
        </>
      ) : (
        <>
          <IonSkeletonText
            animated
            style={{ height: "100vh" }}
          ></IonSkeletonText>
        </>
      )}
    </IonContent>
  );
};

export default MapComponent;
