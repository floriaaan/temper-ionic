import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonSpinner,
} from "@ionic/react";
import { defaultRoute } from "../../routes/web";
import Header from "../../components/Layout/Header";

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
  
  const [showSpinner, setShowSpinner] = useState(false);

  const handlePost = () => {
    setShowSpinner(true);
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
        setShowSpinner(false);
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
        <Header title="Login" version={-1}></Header>
        <div className="row justify-content-center p-4 my-5">
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
              
              {showSpinner ? <IonSpinner name="crescent" className="ml-3" /> : ""}
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
