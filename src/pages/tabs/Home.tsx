import React from 'react'
import { auth_middleware } from '../../middleware/auth';
import { IonPage, IonContent} from "@ionic/react";
import LightList from "../../components/Home/Light/List";
import Header from '../../components/Layout/Header';
import CastList from '../../components/Home/Cast/List';

export default function Home() {
    auth_middleware();
    let auth_json = JSON.parse(
        sessionStorage.getItem("auth") ||
        `{"user": {"name": "","email": ""},"token": ""}`
    ); 

    return (
        <IonPage>
            <IonContent>
                <Header title="Home" version={2}></Header>



                <LightList token={auth_json.token}></LightList>
                <CastList token ={auth_json.token}></CastList>


            </IonContent>
        </IonPage>
    )
}
