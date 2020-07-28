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
  IonItem,
  IonInput,
  IonSpinner,
} from "@ionic/react";
import { barcodeOutline, add, qrCodeOutline, arrowUp } from "ionicons/icons";
import List from "../../components/Probe/ProbeList";
import Swal from "sweetalert2";

import "./ProbeTab.css";
import { auth_middleware } from "../../middleware/auth";

const ProbeTab: React.FC = () => {
  auth_middleware();
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputName, setInputName] = useState<string>();
  const [inputCategory, setInputCategory] = useState<string>();

  const [showAddfromToken, setShowAddfromToken] = useState(false);
  const [inputToken, setInputToken] = useState<string>();

  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingShareToken, setLoadingShareToken] = useState(false);

  let auth_json = JSON.parse(
    localStorage.getItem("auth") ||
    `{"user": {"name": "","email": ""},"token": ""}`
  );

  const [auth_token, setAuthToken] = useState(auth_json.token);

  const handlePost = () => {
    setLoadingPost(true);
    fetch("http://" + window.location.hostname + ":8000/api/v1/probe/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: auth_json.token,
        name: inputName,
        category: inputCategory,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.response) {
          setAuthToken(`${auth_json.token} `);
        }
        setLoadingPost(false);
        setShowAddModal(false);
      });
  };

  const handleTokenPost = () => {
    setLoadingShareToken(true);
    fetch("http://" + window.location.hostname + ":8000/api/v1/share/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: auth_json.token,
        share: inputToken,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.response) {
          setAuthToken(`${auth_json.token} `);
        }
        setLoadingShareToken(false);
        setShowAddfromToken(false);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="p-3 ml-2 mb-2 display-1" style={{fontFamily:'Nunito'}}>
          Probes
        </div>
        <List token={auth_token}></List>

        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="dark">
            <IonIcon icon={arrowUp}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="light" onClick={() => setShowAddModal(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            <IonFabButton
              color="light"
              onClick={() =>
                Swal.fire("QR Code", "Clicked on QRCode", "success")
              }
            >
              <IonIcon icon={qrCodeOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton
              color="light"
              onClick={() => setShowAddfromToken(true)}

            >
              <IonIcon icon={barcodeOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonModal isOpen={showAddModal}>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                value={inputName}
                placeholder="Probe's name"
                onIonChange={(e) => setInputName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={inputCategory}
                placeholder="Probe's category"
                onIonChange={(e) => setInputCategory(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonButton color="success" onClick={() => handlePost()}>
              Validate
              {loadingPost ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                  ""
                )}
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

        <IonModal isOpen={showAddfromToken}>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                value={inputToken}
                placeholder="Access token"
                onIonChange={(e) => setInputToken(e.detail.value!)}
                className="my-3"
              ></IonInput>
            </IonItem>
            <IonButton color="success" onClick={() => handleTokenPost()}>
              Validate
              {loadingShareToken ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                  ""
                )}
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
      </IonContent>
    </IonPage>
  );
};

export default ProbeTab;
