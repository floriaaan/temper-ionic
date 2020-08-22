import React from 'react'
import { IonPage, IonContent, IonList } from '@ionic/react';
import Header from '../../components/Layout/Header';
import { OTP } from '../../middleware/otp';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <Header title="Settings" version={2.1}></Header>


                <IonList>
                    <OTP></OTP>

                </IonList>
            </IonContent>

        </IonPage>
    )
}

export default Settings;