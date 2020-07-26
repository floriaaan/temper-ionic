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
} from "@ionic/react";
import {
  lockClosedOutline,
  moonOutline,
  sunnyOutline,
  settingsOutline,
  peopleCircleOutline,
} from "ionicons/icons";

const UserTab: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    token: "",
    email: "",
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', `${checked}`);
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

  useEffect(() => {
    login();
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <IonPage>
      <IonContent>

      
      <IonCard className="shadow-lg p-0 m-0">
        <IonCardHeader>
          <IonCardTitle className="display-4 text-center">
            {user.name}
          </IonCardTitle>
          <IonCardSubtitle className="text-center lead">
            {user.email}
          </IonCardSubtitle>
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
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserTab;
