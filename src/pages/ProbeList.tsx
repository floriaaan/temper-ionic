import React, { useState } from "react";
import { IonPage, IonFab,IonFabList, IonFabButton, IonIcon, IonModal, IonButton } from "@ionic/react";
import { arrowUpCircle, logoInstagram, logoTwitter, add } from 'ionicons/icons';
import List from "../components/Probe/ProbeList";

const ProbeList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <List user={1}></List>

      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton color="dark">
          <IonIcon icon={arrowUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="light" onClick={() => setShowAddModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabButton color="light">
            <IonIcon icon={logoTwitter}></IonIcon>
          </IonFabButton>
          <IonFabButton color="light">
            <IonIcon icon={logoInstagram}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>

      <IonModal isOpen={showAddModal}>
        <p>This is modal content</p>
        <IonButton onClick={() => setShowAddModal(false)}>Close Modal</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default ProbeList;
