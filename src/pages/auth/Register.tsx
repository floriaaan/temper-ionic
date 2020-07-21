import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import zxcvbn from "zxcvbn";
import { Heading, Image, Text } from "@chakra-ui/core";

const Register: React.FC = () => {
  const [login, setLogin] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPC] = useState<string>();

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({
    logging: false,
    logging_msg: "",
  });

  const [passwordStrength, setPS] = useState({
    score: -1,
    msg: "Start typing your password, we'll tell you its strong",
    color: "",
  });

  const [passwordConfirmationFeedback, setPCF] = useState({
    score: 0,
    msg: "",
    color: "",
  });

  const handlePwdChange = (value: string) => {
    setPassword(value);
    let zx = zxcvbn(value);

    let msg = "";
    let color = "";

    switch (zx.score) {
      case 0:
        msg = "Weak, stop rolling your head on your keyboard 😒";
        color = "danger";
        break;
      case 1:
        msg = "Weak, stop rolling your head on your keyboard 😒";
        color = "danger";
        break;
      case 2:
        msg = "Fair";
        color = "warning";
        break;
      case 3:
        msg = "Good one but you can do better! ✔";
        color = "success";
        break;
      case 4:
        msg = "Rock it! 🛡";
        color = "blue";
        break;
      default:
        msg = "Weak, stop rolling your head on your keyboard 😒";
        color = "danger";
        break;
    }

    setPS({
      score: zx.score,
      msg: msg,
      color: color,
    });
  };

  const handlePCChange = (value: string) => {
    setPC(value);
    if (value === password) {
      setPCF({
        score: 1,
        msg: "Your passwords are identics ✅",
        color: "success",
      });
    } else {
      setPCF({
        score: 0.1,
        msg: "Your passwords are not identics ⛔",
        color: "danger",
      });
    }
  };

  const succesfullyLogged = () => {
    localStorage.setItem("auth.logged", "1");
    window.location.pathname = "/probes";
  };

  const handlePost = () => {
    fetch("http://" + window.location.hostname + ":8000/api/v1/user/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
        password_confirmation : passwordConfirmation,
        email: email
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.response || !result.response.data.token) {
          if(!result.response) {
            let keys = Object.keys(result);
            setError({ logging: true, logging_msg: result[keys[0]] });
            setShowError(true);
          } else {
            setError({ logging: true, logging_msg: result.response.data });
            setShowError(true);
          }
          
        } else {
          localStorage.setItem("auth", JSON.stringify(result.response.data));
          succesfullyLogged();
        }
      });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="row justify-content-center p-4 mt-3">
          <IonGrid>
            <IonRow>
              <IonCol>
                <Image
                  alt="Temper App"
                  src="/assets/icon/favicon.png"
                  style={{
                    height: "20vh",
                    width: "20vh",
                    marginBottom: "40px",
                  }}
                />
              </IonCol>
              <IonCol className="ion-align-self-center">
                <Heading as="h3" size="2xl" textAlign="center">
                  Register
                </Heading>
              </IonCol>
            </IonRow>
          </IonGrid>
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
              <IonLabel position="floating">Email (not required)</IonLabel>
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                required
                type="password"
                onIonChange={(e) => handlePwdChange(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <div className="mt-2 mb-1 mx-3">
              <IonProgressBar
                color={passwordStrength.color}
                value={passwordStrength.score * 0.25}
              ></IonProgressBar>
              <Text fontSize="xs" className="ion-color-primary mt-1">
                {passwordStrength.msg}
              </Text>
            </div>

            <IonItem>
              <IonLabel position="floating">Confirm password</IonLabel>
              <IonInput
                required
                type="password"
                onIonChange={(e) => handlePCChange(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <div className="mt-2 mb-1 mx-3">
              <IonProgressBar
                color={passwordConfirmationFeedback.color}
                value={passwordConfirmationFeedback.score}
              ></IonProgressBar>
              <Text fontSize="xs" className="ion-color-primary mt-1">
                {passwordConfirmationFeedback.msg}
              </Text>
            </div>
          </div>
          <div className="py-4 my-2">
            <IonButton
              expand="block"
              color="primary"
              fill="outline"
              onClick={() => handlePost()}
            >
              Create an account
            </IonButton>
          </div>
        </div>
      </IonContent>
      <IonAlert
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        cssClass="my-custom-class"
        header={"Register : Error"}
        message={error.logging_msg}
        buttons={["OK, I'll focus"]}
      />
    </IonPage>
  );
};

export default Register;
