import React from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import Header from "../../components/Layout/Header";

const DevTools: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Header title="Dev Tools" version={2.1}></Header>
      </IonContent>
    </IonPage>
  );
};

export default DevTools;
