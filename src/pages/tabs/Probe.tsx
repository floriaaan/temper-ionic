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
  IonLabel,
  IonItemDivider,
  IonRow,
  IonCol,
} from "@ionic/react";
import { barcodeOutline, add, qrCodeOutline, arrowUp } from "ionicons/icons";
import List from "../../components/Weather/Probe/List";
import Swal from "sweetalert2";

import "./Probe.css";
import { auth_middleware } from "../../middleware/auth";
import { ToastContainer, toast } from "react-toastify";

import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";

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
    sessionStorage.getItem("auth") ||
      `{"user": {"name": "","email": ""},"token": ""}`
  );

  const [auth_token, setAuthToken] = useState(auth_json.token);

  const [gps, setGPS] = useState({
    lat: 9999,
    lng: 9999,
  });

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
        gps_lon: gps.lng === 9999 ? null : gps.lng,
        gps_lat: gps.lat === 9999 ? null : gps.lat,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.response) {
          setInputName("");
          setInputCategory("");
          setAuthToken(`${auth_json.token} `);
          toast.success("✅ Probe is successfully added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("⛔ Error while adding the probe", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
          setInputToken("");
          setAuthToken(`${auth_json.token} `);
          toast.success("✅ Probe is successfully added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("⛔ Error while adding the probe", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setLoadingShareToken(false);
        setShowAddfromToken(false);
      });
  };

  const handleGPSSelection = (e: LeafletMouseEvent) => {
    setGPS(e.latlng);
  }

  return (
    <IonPage>
      <IonContent>
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

        <IonModal isOpen={showAddModal} cssClass="modal-create">
          <IonContent>
            <div className="p-3">
              <IonRow>
                <IonCol sizeLg="6">
                  <div className="display-5" style={{ fontFamily: "Nunito" }}>
                    Details of {inputName ? inputName : "probe"}
                  </div>

                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      value={inputName}
                      onIonChange={(e) => setInputName(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Category</IonLabel>
                    <IonInput
                      value={inputCategory}
                      onIonChange={(e) => setInputCategory(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                </IonCol>

                <IonCol sizeLg="6">
                  <div className="display-6" style={{ fontFamily: "Nunito" }}>
                    Location of {inputName ? inputName : "probe"}
                  </div>
                  <Map
                    center={[43, 1]}
                    zoom={3}
                    style={{ height: "200px", width: "99%" }}
                    onclick={(e) => handleGPSSelection(e)}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="Temper 💞"
                    />
                    {gps.lat !== 9999 && gps.lng !== 9999 ? <Marker position={[gps.lat!, gps.lng!]}></Marker> : ""}
                    
                  </Map>
                </IonCol>
              </IonRow>
              <hr className="mx-2 my-4" />

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
            </div>
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </IonContent>
    </IonPage>
  );
};

export default ProbeTab;
