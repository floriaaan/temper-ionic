import React, { useEffect, useState } from "react";
import {
  IonPage,
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
    document.body.classList.toggle("dark", checked);
  };

  useEffect(() => {
    async function fetchUser() {
      await fetch(
        "http://" + window.location.hostname + ":8000/api/v1/user/infos/" + 1
      )
        .then((res) => res.json())
        .then((res) => {
          setUser(res.response.data);
        });
    }
    fetchUser();
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
      <IonPage style={{backgroundColor: "#222428"}}>
        <IonCard className="shadow-lg p-0">
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
            <IonItem button onClick={() => {}}>
              <IonIcon icon={lockClosedOutline} slot="start"></IonIcon>
              <IonLabel>Log Out</IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="primary">
                <IonIcon icon={peopleCircleOutline}></IonIcon>
                <IonLabel>
                  Switch Accounts
                </IonLabel>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItem button onClick={() => {}}>
            <IonIcon icon={settingsOutline} slot="start"></IonIcon>
            <IonLabel>Settings</IonLabel>
          </IonItem>
        </IonCard>
      </IonPage>
  );
};

export default UserTab;
