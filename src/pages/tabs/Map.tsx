import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import MapComponent from "../../components/Map/Map";
import { auth_middleware } from "../../middleware/auth";
import Header from "../../components/Layout/Header";

const MapTab: React.FC = () => {
  auth_middleware();

  let auth_json = JSON.parse(
    sessionStorage.getItem("auth") ||
      `{"user": {"name": "","email": ""},"token": ""}`
  );

  return (
    <IonPage>
      <IonContent>
        <Header title="Map" version={2}></Header>
        <MapComponent token={auth_json.token}></MapComponent>
      </IonContent>
    </IonPage>
  );
};

export default MapTab;
