import React from "react";
import { IonPage } from "@ionic/react";
import MapComponent from "../../components/Map/Map";
import { auth_middleware } from "../../middleware/auth";

const MapTab: React.FC = () => {
  auth_middleware();

  let auth_json = JSON.parse(
    localStorage.getItem("auth") ||
      `{"user": {"name": "","email": ""},"token": ""}`
  );

  return (
    <IonPage>
      <MapComponent token={auth_json.token}></MapComponent>
    </IonPage>
  );
};

export default MapTab;
