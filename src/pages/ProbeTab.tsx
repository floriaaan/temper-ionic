import React, { useState } from "react";
import {
  IonPage,
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonContent,
  IonItemDivider,
  IonItem,
  IonInput,
} from "@ionic/react";
import { arrowUpCircle, logoInstagram, logoTwitter, add, qrCodeOutline } from "ionicons/icons";
import List from "../components/Probe/ProbeList";
import Swal from 'sweetalert2';

import "./ProbeTab.css";

const ProbeTab: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputName, setInputName] = useState<string>();
  const [inputCategory, setInputCategory] = useState<string>();

  const handlePost = () => {
    //TODO: add a loader
    async function post() {
      await fetch("http://"+ window.location.hostname +":8000/api/v1/probe/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: 1,
          name: inputName,
          category: inputCategory,
        }),
      })
        .then((res) => res.json())
        .then((result) => {});
    }

    post();
    setShowAddModal(false);
  };

  return (
    <div className="bg-primary">
      <IonPage className="bg-primary">
        <List user={1}></List>

        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="dark">
            <IonIcon icon={arrowUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="light" onClick={() => setShowAddModal(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            <IonFabButton color="light" onClick={() => Swal.fire('QR Code', 'Clicked on QRCode', 'success')}>
              <IonIcon icon={qrCodeOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton color="light" onClick={() => ''}>
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonModal isOpen={showAddModal}>
          <IonContent className="ion-padding">
            <IonItemDivider>Probe's name</IonItemDivider>
            <IonItem>
              <IonInput
                value={inputName}
                placeholder="Probe's name"
                onIonChange={(e) => setInputName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItemDivider></IonItemDivider>
            <IonItemDivider>Probe's category</IonItemDivider>
            <IonItem>
              <IonInput
                value={inputCategory}
                placeholder="Probe's category"
                onIonChange={(e) => setInputCategory(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItemDivider></IonItemDivider>
            <IonButton color="success" onClick={() => handlePost()}>
              Validate
            </IonButton>
            <IonButton
              color="secondary"
              slot="end"
              onClick={() => setShowAddModal(false)}
            >
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonPage>
    </div>
  );
};

export default ProbeTab;
