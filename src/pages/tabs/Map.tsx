import React from "react";
import { IonPage } from "@ionic/react";
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
      <Header title="Map" version={1}></Header>
      <MapComponent token={auth_json.token}></MapComponent>
    </IonPage>
  );
};

export default MapTab;
