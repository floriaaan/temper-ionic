import React, { useState, useEffect } from 'react'

import "./Light.css";
import { IonSkeletonText, IonItem, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { Heading, Box, Spinner } from '@chakra-ui/core';

import BulbOn from './bulb-on.svg';
import BulbOff from './bulb-off.svg';


interface ContainerProps {
    data: {
        id: number,
        token: string,
        name: string,
        category: string,
        state: number,
    };
}

const Light: React.FC<ContainerProps> = ({ data }) => {
    const [light, setLight] = useState(data);

    const [state, setState] = useState({
        loading: true,
        spinner: false
    })


    const handleToggle = () => {
        setState({ ...state, spinner: true });
        setTimeout(() => {
            light.state === 1 ? setLight({ ...light, state: 2 }) : setLight({ ...light, state: 1 })

            setState({ ...state, spinner: false });
        }, 1000)

    };

    useEffect(() => {
        setTimeout(() => {

            setState({ ...state, loading: false });
        }, 1000);
        //eslint-disable-next-line
    }, [])

    let dotState = <></>;
    let bulbState;

    if (light.state === 0) { dotState = <span className="dot dot-disabled"> </span>; bulbState = BulbOff };
    if (light.state === 1) { dotState = <span className="dot dot-active"> </span>; bulbState = BulbOn };
    if (light.state === 2) { dotState = <span className="dot dot-idle"> </span>; bulbState = BulbOff };

    return (
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" style={{ height: '200px' }}>
            {!state.loading ? (
                <>
                    <IonItem>
                        <Heading as="h6" size="md" style={{ fontWeight: 'normal' }}>
                            {light.name ? light.name : "Light #" + light.token}
                            {dotState}
                            {state.spinner ? <Spinner size="xs" className="ml-3" /> : ""}
                        </Heading>


                        <IonButton fill="clear" slot="end" onClick={() => { console.log("view " + light.token) }}>
                            <IonIcon icon={menuOutline} size="lg"></IonIcon>
                        </IonButton>
                    </IonItem>

                    <IonCardContent>

                        <img className="bulb" src={bulbState} onClick={() => { handleToggle() }} alt="Light icon"></img>


                    </IonCardContent>
                </>
            ) : (
                    <>
                        <IonSkeletonText
                            animated
                            style={{ heigth: "25vh", width: "30%" }}
                        ></IonSkeletonText>
                    </>
                )}
        </Box>
    )
}

export default Light;

/*
<IonButton
                            expand="block"
                            color={light.state ? "danger" : "success"}
                            onClick={() => {
                                handleToggle();
                            }}
                        >
                            <IonIcon
                                icon={light.state ? flashOffOutline : flashOutline}
                                slot="start"
                            ></IonIcon>
                            {light.state ? "Disable" : "Activate"}
                            {state.spinner ? <IonSpinner name="crescent" className="ml-3" /> : ""}

                        </IonButton>
*/