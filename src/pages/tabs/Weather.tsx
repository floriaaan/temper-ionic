import React from 'react'
import { auth_middleware } from '../../middleware/auth';
import { IonPage, IonContent} from "@ionic/react";
import Header from '../../components/Layout/Header';
import ProbeList from '../../components/Weather/Probe/List';

export default function Weather() {
    auth_middleware();
    let auth_json = JSON.parse(
        sessionStorage.getItem("auth") ||
        `{"user": {"name": "","email": ""},"token": ""}`
    ); 

    return (
        <IonPage>
            <IonContent>
                <Header title="Weather" version={2}></Header>



                <ProbeList token={auth_json.token}></ProbeList>


            </IonContent>
        </IonPage>
    )
}
