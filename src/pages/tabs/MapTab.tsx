import React from "react";
import { IonPage } from "@ionic/react";
import MapComponent from "../../components/Map/Map";

const MapTab: React.FC = () => {
  return (
    <IonPage>
      <MapComponent user={1}></MapComponent>
    </IonPage>
  );
};

export default MapTab;
