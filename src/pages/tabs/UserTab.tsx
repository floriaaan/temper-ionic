import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonToggle,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonRow,
  IonCol,
  IonToast,
} from "@ionic/react";
import {
  lockClosedOutline,
  moonOutline,
  sunnyOutline,
  settingsOutline,
  peopleCircleOutline,
  bugOutline,
} from "ionicons/icons";
import { Avatar } from "@chakra-ui/core";
import Swal from "sweetalert2";

const UserTab: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    token: "",
    email: "",
  });

  let auth_dev = localStorage.getItem("auth.dev") || "0";
  const [darkMode, setDarkMode] = useState(false);

  const [clickForDevMode, setClickForDevMode] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState(
    `You're ${clickForDevMode} steps away from Dev Mode. 🔨`
  );
  const [developperMode, setDevelopperMode] = useState(auth_dev === "1");

  const handleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", `${checked}`);
    document.body.classList.toggle("dark", checked);
  };

  const login = async () => {
    let auth_json = JSON.parse(
      localStorage.getItem("auth") ||
        `{"user": {"name": "","email": ""},"token": ""}`
    );
    setUser({
      name: auth_json.user.name,
      token: auth_json.token,
      email: auth_json.user.email,
    });
  };

  const logout = async () => {
    await fetch(
      "http://" + window.location.hostname + ":8000/api/v1/user/logout/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: user.token,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        //localstorage wipe
        localStorage.setItem("auth.logged", "0");
        localStorage.setItem("auth", "");
        setUser({ name: "", token: "", email: "" });
        window.location.href =
          "http://" + window.location.hostname + ":3000/login";
      });
  };

  const handleClickForDevMode = () => {
    setClickForDevMode(clickForDevMode + 1);
    setToastVisible(true);
    console.log(clickForDevMode, auth_dev);
    if (developperMode) {
      setToastMsg("You're already a developper");
    } else if (clickForDevMode === 7) {
      setDevelopperMode(true);
      localStorage.setItem("auth.dev", "1");
      setToastMsg("You're now a developper! Congrats 🤴");
    } else {
      setToastMsg(`You're ${7 - clickForDevMode} steps away from Dev Mode. 🔨`);
    }
  };

  useEffect(() => {
    login();
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonCard className="shadow-lg p-0 m-0">
          <IonCardHeader>
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-justify-content-center" size="12">
                <div className="row m-0 justify-content-center">
                  <Avatar
                    size="2xl"
                    name={user.name}
                    src=""
                    textAlign="center"
                    onClick={() => handleClickForDevMode()}
                  />
                </div>
                <IonCardTitle className="display-4 text-center">
                  {user.name}
                </IonCardTitle>
                <IonCardSubtitle className="text-center">
                  {user.email}
                </IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonCardHeader>
          <IonItemDivider></IonItemDivider>
          <IonItem>
            <IonIcon
              icon={darkMode ? moonOutline : sunnyOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Toggle Dark Mode</IonLabel>
            <IonToggle
              checked={darkMode}
              onIonChange={(e) => handleDarkMode(e.detail.checked)}
              slot="end"
            />
          </IonItem>

          <IonItemDivider></IonItemDivider>
          <IonItemSliding>
            <IonItem
              button
              onClick={() => {
                logout();
              }}
            >
              <IonIcon icon={lockClosedOutline} slot="start"></IonIcon>
              <IonLabel>Log Out</IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="primary">
                <IonIcon icon={peopleCircleOutline}></IonIcon>
                <IonLabel>Switch Accounts</IonLabel>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItem button onClick={() => {}}>
            <IonIcon icon={settingsOutline} slot="start"></IonIcon>
            <IonLabel>Settings</IonLabel>
          </IonItem>
          {developperMode ? (
            <IonItem
              button
              onClick={() => {
                Swal.fire({
                  title: "About!",
                  text: "Je te nem Ophéphéphé 💞",
                  timer: 2000,
                  imageUrl: "https://media1.tenor.com/images/c1b2cb88bc3cf44b10735cab46360c95/tenor.gif?itemid=13055170",
                  imageAlt: "Love",
                });
              }}
            >
              <IonIcon icon={bugOutline} slot="start"></IonIcon>
              <IonLabel>About</IonLabel>
            </IonItem>
          ) : (
            ""
          )}
        </IonCard>
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message={toastMsg}
          duration={50}
        />
      </IonContent>
    </IonPage>
  );
};

export default UserTab;
