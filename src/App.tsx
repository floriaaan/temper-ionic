import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { thermometerOutline, mapOutline, peopleOutline } from 'ionicons/icons';

import ProbeTab from './pages/ProbeTab';
import MapTab from './pages/MapTab';
import UserTab from './pages/UserTab';
import ProbePage from './pages/ProbePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'bootstrap/dist/css/bootstrap.min.css';


/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/probes" component={ProbeTab} exact={true} />
          <Route path="/map" component={MapTab} exact={true} />
          <Route path="/probe/:id" component={ProbePage} exact={true} />
          <Route path="/user" component={UserTab} />
          <Route path="/" render={() => <Redirect to="/probes" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="probes" href="/probes">
            <IonIcon icon={thermometerOutline} />
            <IonLabel>Probes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon icon={mapOutline} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="user" href="/user">
            <IonIcon icon={peopleOutline} />
            <IonLabel>User</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
