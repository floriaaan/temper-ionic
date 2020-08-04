import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { Image, Heading } from "@chakra-ui/core";
import { defaultRoute } from "../../routes/web";

const Login: React.FC = () => {
  const succesfullyLogged = () => {
    sessionStorage.setItem("auth.logged", "1");
    window.location.pathname = defaultRoute;
  };

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({
    logging: false,
    logging_msg: "",
  });

  const handlePost = () => {
    fetch("http://" + window.location.hostname + ":8000/api/v1/user/connect/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.response || !result.response.data.token) {
          if (!result.response) {
            let keys = Object.keys(result);
            setError({ logging: true, logging_msg: result[keys[0]] });
            setShowError(true);
          } else {
            setError({ logging: true, logging_msg: result.response.data });
            setShowError(true);
          }
          
        } else {
          sessionStorage.setItem("auth", JSON.stringify(result.response.data));
          succesfullyLogged();
        }
      });
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
              fill="outline"
              onClick={() => handlePost()}
            >
              Connect to Temper
            </IonButton>
          </div>
        </div>
      </IonContent>
      <IonAlert
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        cssClass="my-custom-class"
        header={"Login : Error"}
        message={error.logging_msg}
        buttons={["OK, I'll focus"]}
      />
    </IonPage>
  );
};

export default Login;
