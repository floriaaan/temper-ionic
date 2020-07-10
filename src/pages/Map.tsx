import React from "react";
import { IonPage } from "@ionic/react";
import MapComponent from '../components/Map/Map';




const ProbeList: React.FC = () => {
    
  
    return (
      <div className="bg-primary">
        <IonPage className="bg-primary">
          <MapComponent user={1}></MapComponent>
        </IonPage>
      </div>
    );
  };
  
  export default ProbeList;
  