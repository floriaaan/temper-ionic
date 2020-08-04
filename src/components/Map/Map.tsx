import React, { useState, useEffect } from "react";

import { IonContent, IonSkeletonText, IonButton, IonBackdrop } from "@ionic/react";

import "../../theme/leaflet.css";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ContainerProps {
  token: string;
}

const MapComponent: React.FC<ContainerProps> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [gpsArray, setGPSArray] = useState([{ lon: 999, lat: 999 }]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "http://" + window.location.hostname + ":8000/api/v1/probe/user/" + token
      )
        .then((res) => res.json())
        .then((res) => {
          res.response.data.forEach((id: number) => {
            fetch(
              "http://" + window.location.hostname + ":8000/api/v1/probe/" + id
            )
              .then((res) => res.json())
              .then((res) => {
                if (res.response.data.gps.lon && res.response.data.gps.lat) {
                  setGPSArray([...gpsArray, res.response.data.gps]);
                }
              });
          });
          setLoading(false);
        });
    }

    fetchData();
    // eslint-disable-next-line
  }, [token]);

  const gpsElements = JSON.stringify(gpsArray) !== JSON.stringify([{ lon: 999, lat: 999 }]) ?
    (<Map center={[43, 1]} zoom={3} style={{ height: '98%', width: '99%' }}>
      <TileLayer
        attribution='Temper 💞'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {gpsArray.map((obj, key) => {
        return (
          <React.Fragment key={key}>
            <Marker position={[obj.lon, obj.lat]}>
              <Popup>
                <IonButton>Coucou</IonButton>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </Map>)
    : <React.Fragment>

      <IonBackdrop tappable={false} visible={true} stopPropagation={true} />
      <Map center={[43, 1]} zoom={3} style={{ height: '98%', width: '99%', backgroundColor: 'gray', color: 'gray', opacity: '0.7' }}>
        <TileLayer
          attribution='Temper 💞'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
      <div className="">
        Aucun appareil localisé
      </div>
    </React.Fragment>;

  return (
    <IonContent>
      {!loading ? (
        <>
          {gpsElements}
        </>
      ) : (
          <>
            <IonSkeletonText
              animated
              style={{ height: "15vh" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated
              style={{ height: "45vh" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated
              style={{ height: "30vh" }}
            ></IonSkeletonText>
          </>
        )
      }
    </IonContent >
  );
};

export default MapComponent;

