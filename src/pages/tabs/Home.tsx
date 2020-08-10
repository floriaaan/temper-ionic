import React, { useState } from 'react'
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

    const [auth_token, setAuthToken] = useState(auth_json.token);

    

    return (
        <IonPage>
            <IonContent>
                <Header title="Home" version={2}></Header>



                <LightList token={auth_token}></LightList>
                <CastList token ={auth_token}></CastList>


            </IonContent>
        </IonPage>
    )
}
