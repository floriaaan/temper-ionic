import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonToggle,
} from "@ionic/react";
import Header from "../../components/Layout/Header";

const DevTools: React.FC = () => {
  let dev_json = JSON.parse(
    sessionStorage.getItem("dev") || `{"toggle1": "false"}`
  );

  const [dev1, setDev1] = useState(dev_json.toggle1);
  const handleDev1 = (checked: boolean) => {
    setDev1(checked);
    dev_json.toggle1 = checked;
    sessionStorage.setItem("dev", JSON.stringify(dev_json));
  };

  return (
    <IonPage>
      <IonContent>
        <Header title="Dev Tools" version={2.1}></Header>

        <IonList>
          <IonItem>
            <IonLabel>Toggle 1</IonLabel>
            <IonToggle
              checked={dev1}
              onIonChange={(e) => handleDev1(e.detail.checked)}
              slot="end"
            ></IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DevTools;
