import React, { useState } from 'react'
import { auth_middleware } from '../../middleware/auth';
import { IonPage, IonContent, IonSearchbar } from "@ionic/react";
import List from "../../components/Home/Light/List";

export default function Home() {
    auth_middleware();
    let auth_json = JSON.parse(
        sessionStorage.getItem("auth") ||
        `{"user": {"name": "","email": ""},"token": ""}`
    );

    const [auth_token, setAuthToken] = useState(auth_json.token);
    const [search, setSearch] = useState<string>();

    return (
        <IonPage>
            <IonContent>
            <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)} showCancelButton="focus" animated></IonSearchbar>

            <List token={auth_token}></List>
            </IonContent>
        </IonPage>
    )
}
