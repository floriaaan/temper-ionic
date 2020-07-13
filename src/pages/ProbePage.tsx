import React, { useEffect, useState } from "react";

import { RefresherEventDetail } from '@ionic/core';
import { IonPage, IonFab, IonFabButton, IonIcon, IonContent, IonSlides, IonSlide, IonRefresher, IonRefresherContent } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { arrowUpCircle, chevronDownCircleOutline } from "ionicons/icons";

import "./ProbePage.css"



const ProbePage: React.FC = () => {
    let location = useLocation();
    let id = location.pathname.split('/')[2];

    const [name, setName] = useState();
    const [state, setState] = useState();
    const [category, setCategory] = useState();
    const [measures, setMeasures] = useState([{
        temperature: null,
        humidity: null,
        date: null,
    }]);
    const [gps, setGPS] = useState({
        lon: 0,
        lat: 0,
    });
    const [loading, setLoading] = useState(true);

    const handleScroll = (e: any) => {
        let scroll = document.querySelector('#scroll')!;


        if (e.detail.scrollTop > 20) {
            scroll.classList.remove('d-none');
        } else {
            scroll.classList.add('d-none');

        }
    }

    const fetchMeasures = async () => {
        await fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + id)
            .then((res) => res.json())
            .then((res) => {
                setMeasures(res.response.data.lastmeasure)
            });
    }
    const fetchData = async () => {
        await fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + id)
            .then((res) => res.json())
            .then((res) => {
                setName(res.response.data.name);
                setState(res.response.data.state);
                setCategory(res.response.data.category);
                setGPS(res.response.data.gps);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
        fetchMeasures();
        // eslint-disable-next-line
    }, []);

    const scrollToTop = () => {
        document.querySelector('ion-content')!.scrollToTop(500);
    }

    const doMeasuresRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        fetchMeasures().then(() => { event.detail.complete(); });
    }


    return (

        <IonPage>
            <IonContent
                scrollEvents={true}
                onIonScrollStart={() => { }}
                onIonScroll={(e) => { handleScroll(e) }}
                onIonScrollEnd={() => { }}>

                <IonSlides pager={true} options={{
                    initialSlide: 1,
                    speed: 400
                }}>
                    <IonSlide>
                        Data of probe
                    </IonSlide>
                    <IonSlide>
                        <IonRefresher slot="fixed" onIonRefresh={doMeasuresRefresh}>
                            <IonRefresherContent>
                                
                            </IonRefresherContent>
                        </IonRefresher>
                        Measures of probe
                        {JSON.stringify(measures)}
                    </IonSlide>
                    <IonSlide>
                        Settings of probe
                    </IonSlide>
                </IonSlides>

                <IonFab horizontal="end" vertical="bottom" slot="fixed" id="scroll" className="d-none">
                    <IonFabButton color="dark" onClick={() => scrollToTop()}>
                        <IonIcon icon={arrowUpCircle}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ProbePage;
