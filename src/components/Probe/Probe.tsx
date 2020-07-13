import React, { useState, useEffect } from "react";
import "./Probe.css";
import "leaflet/dist/leaflet.css"

import {
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonCardContent,
  IonSkeletonText,
  IonBadge,
  IonCardTitle,
  IonList,
  IonListHeader,
  IonIcon,
} from "@ionic/react";
import {
  thermometerOutline,
  rainyOutline,
  timeOutline,
  flashOffOutline,
  flashOutline,
} from "ionicons/icons";


import moment from "moment";
import L from 'leaflet';
import { Map, TileLayer, Marker } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useHistory } from "react-router-dom";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


interface ContainerProps {
  id: number;
}

const Probe: React.FC<ContainerProps> = ({ id }) => {
  const [name, setName] = useState();
  const [state, setState] = useState();
  const [category, setCategory] = useState();
  const [lastMeasure, setLastMeasure] = useState({
    temperature: null,
    humidity: null,
    date: null,
  });
  const [gps, setGPS] = useState({
    lon: 0,
    lat: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    async function toggleState() {
      await fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + id + "/toggle", {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((result) => {
          setState(result.response.data.state);
        });
    }

    toggleState();
  };

  useEffect(() => {
    async function fetchData() {
      await fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + id)
        .then((res) => res.json())
        .then((res) => {
          setName(res.response.data.name);
          setState(res.response.data.state);
          setCategory(res.response.data.category);
          setLastMeasure(res.response.data.lastmeasure);
          setGPS(res.response.data.gps);
          setLoading(false);
        });
    }

    fetchData();
  }, [id]);

  const history = useHistory();
  const navigateTo = () => history.push('/probe/' + id);

  return (
    <IonCard>
      {!loading ? (
        <>
          <IonItem>
            <IonCardTitle>{name ? name : "Sonde #" + id}</IonCardTitle>
            <IonBadge className="ion-margin-horizontal" color="warning">
              {category}
            </IonBadge>

            <IonBadge color={state ? "success" : "danger"}>
              {state ? "Active" : "Disabled"}
            </IonBadge>

            <IonButton fill="outline" slot="end" onClick={() => navigateTo()}>
              View
            </IonButton>
          </IonItem>

          <IonCardContent>
            {lastMeasure.temperature &&
              lastMeasure.humidity &&
              lastMeasure.date ? (
                <>
                  <IonListHeader lines="full">
                    <IonLabel>Last Measures</IonLabel>
                    <IonButton>See All</IonButton>
                  </IonListHeader>
                  <IonList>
                    <IonItem>
                      <IonLabel>
                        <h2>
                          <IonIcon
                            icon={thermometerOutline}
                            className="ion-margin-horizontal"
                            color="primary"
                          ></IonIcon>
                          {lastMeasure.temperature
                            ? lastMeasure.temperature + " °C"
                            : "No temperature ❌"}
                        </h2>
                        <h3>
                          <IonIcon
                            icon={rainyOutline}
                            className="ion-margin-horizontal"
                            color="secondary"
                          ></IonIcon>
                          {lastMeasure.humidity
                            ? lastMeasure.humidity + " %"
                            : "No humidity ❌"}
                        </h3>
                        <p>
                          <IonIcon
                            icon={timeOutline}
                            className="ion-margin-horizontal"
                            color="tertiary"
                          ></IonIcon>
                          {lastMeasure.date
                            ? moment(lastMeasure.date).fromNow()
                            : "No date ❌"}
                        </p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </>
              ) : (
                <> </>
              )}
            {gps.lon && gps.lat ? (
              <Map center={[gps.lon, gps.lat]} zoom={15}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[gps.lon, gps.lat]}>
                </Marker>
              </Map>
            ) : (
                <IonLabel>
                  No Location{" "}
                  <span role="img" aria-label="No location">
                    ❌
                </span>
                </IonLabel>
              )}
            <IonButton
              expand="block"
              color={state ? "danger" : "success"}
              onClick={() => {
                handleToggle();
              }}
            >
              <IonIcon
                icon={state ? flashOffOutline : flashOutline}
                slot="start"
              ></IonIcon>
              {state ? "Disable" : "Activate"}
            </IonButton>
          </IonCardContent>
        </>
      ) : (
          <>
            <IonItem>
              <IonSkeletonText animated></IonSkeletonText>
            </IonItem>

            <IonCardContent>
              <IonSkeletonText
                animated
                style={{ heigth: "100px" }}
              ></IonSkeletonText>
            </IonCardContent>
          </>
        )}
    </IonCard>
  );
};

export default Probe;
