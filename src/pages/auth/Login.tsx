import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import { Image, Heading } from "@chakra-ui/core";

const Login: React.FC = () => {
  const succesfullyLogged = () => {
    localStorage.setItem("auth.logged", '1');
    window.location.pathname = "/probes";
  };

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handlePost = () => {
    succesfullyLogged();
  };

  return (
    <IonPage>
      <IonContent>
        <div className="row justify-content-center p-4 mt-3">
          <Image
            alt="Temper App"
            src="/assets/icon/favicon.png"
            style={{ height: "20vh", width: "20vh", marginBottom: "40px" }}
          />
          <Heading as="h3" size="2xl" textAlign="center">
            Login
          </Heading>
          <div className="p-4 my-2">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                required
                type="text"
                onIonChange={(e) => setLogin(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                required
                type="password"
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </div>
          <div className="py-4 my-2">
            <IonButton
              expand="block"
              color="primary"
              onClick={() => handlePost()}
            >
              Connect to Temper
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
