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
} from "@ionic/react";
import {
  lockClosedOutline,
  moonOutline,
  sunnyOutline,
  settingsOutline,
  peopleCircleOutline,
  bugOutline,
  happyOutline,
} from "ionicons/icons";
import { Avatar } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTab: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    token: "",
    email: "",
  });

  let auth_dev = sessionStorage.getItem("auth.dev") || "0";
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("darkMode") === "true" || false
  );

  const [clickForDevMode, setClickForDevMode] = useState(0);
  const [developperMode, setDevelopperMode] = useState(auth_dev === "1");

  const handleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    sessionStorage.setItem("darkMode", `${checked}`);
    document.body.classList.toggle("dark", checked);
  };

  const login = async () => {
    let auth_json = JSON.parse(
      sessionStorage.getItem("auth") ||
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
        //sessionStorage wipe
        sessionStorage.setItem("auth.logged", "0");
        sessionStorage.setItem("auth", "");
        setUser({ name: "", token: "", email: "" });
        window.location.href =
          "http://" + window.location.hostname + ":3000/login";
      });
  };

  const handleClickForDevMode = () => {
    setClickForDevMode(clickForDevMode + 1);
    if (developperMode) {
      toast.info(`You're already a developper`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else if (clickForDevMode === 7) {
      setDevelopperMode(true);
      sessionStorage.setItem("auth.dev", "1");
      toast.success(`You're now a developper! Congrats 🤴`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast(`You're ${7 - clickForDevMode} steps away from Dev Mode. 🔨`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  useEffect(() => {
    login();
    handleDarkMode(darkMode);
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const navigateTo = (url: string) => history.push(url);

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
          <IonItem
            button
            onClick={() => {
              navigateTo("/about");
            }}
          >
            <IonIcon icon={happyOutline} slot="start"></IonIcon>
            <IonLabel>About</IonLabel>
          </IonItem>
          {developperMode ? (
            <>
              <IonItemDivider></IonItemDivider>

              <IonItem
                button
                onClick={() => {
                  navigateTo("/dev");
                }}
              >
                <IonIcon icon={bugOutline} slot="start"></IonIcon>
                <IonLabel>Developper Tools</IonLabel>
              </IonItem>
            </>
          ) : (
            ""
          )}
        </IonCard>
        
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
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

export default UserTab;
