import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Routes, RoutesTab, RoutesAuth } from "./routes/web";
//import { thermometerOutline, mapOutline, peopleOutline } from "ionicons/icons";

import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";

/*import ProbeTab from "./pages/ProbeTab";
import MapTab from "./pages/MapTab";
import UserTab from "./pages/UserTab";
import ProbePage from "./pages/ProbePage";*/

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "bootstrap/dist/css/bootstrap.min.css";

/* Theme variables */
import { temper } from "./theme/temper";
import "./theme/variables.css";
import { auth_middleware } from "./middleware/auth";
//import { auth_middleware } from "./middleware/auth";

const logged = (
  <ThemeProvider theme={temper}>
    <CSSReset />
    <ColorModeProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {Routes.map((obj, key) => {
              return (
                <Route
                  path={obj.path}
                  component={obj.component}
                  exact={true}
                  key={key}
                />
              );
            })}

            <Route
              path="/"
              render={() => <Redirect to="/probes" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {RoutesTab.map((obj, key) => {
              return (
                <IonTabButton
                  tab={obj.label.toLowerCase()}
                  href={obj.path}
                  key={key}
                >
                  <IonIcon icon={obj.icon} />
                  <IonLabel>{obj.label}</IonLabel>
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </ColorModeProvider>
  </ThemeProvider>
);

const notLogged = (
  <ThemeProvider theme={temper}>
    <CSSReset />
    <ColorModeProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {RoutesAuth.map((obj, key) => {
              return (
                <Route
                  path={obj.path}
                  component={obj.component}
                  exact={true}
                  key={key}
                />
              );
            })}
            <Route
              path="/"
              render={() => <Redirect to="/login" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {RoutesAuth.map((obj, key) => {
              return (
                <IonTabButton
                  tab={obj.label.toLowerCase()}
                  href={obj.path}
                  key={key}
                >
                  <IonIcon icon={obj.icon} />
                  <IonLabel>{obj.label}</IonLabel>
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </ColorModeProvider>
  </ThemeProvider>
);

const App: React.FC = () => {
  if (!localStorage.getItem("auth.logged")) {
    localStorage.setItem("auth.logged", "0");
  }
  
  auth_middleware();

  return <IonApp>{localStorage.getItem("auth.logged") === "1" ? logged : notLogged}</IonApp>;
};

export default App;
