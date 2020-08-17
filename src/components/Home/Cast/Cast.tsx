import React, { useState, useEffect } from 'react'

import { IonSkeletonText, IonItem, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { Heading, Box, Spinner } from '@chakra-ui/core';


import CastOn from './cast-on.svg';
import CastOff from './cast-off.svg';
import "./Cast.css";



interface ContainerProps {
    data: {
        id: number,
        token: string,
        name: string,
        category: string,
        state: number,
        status: string
    };
}

const Cast: React.FC<ContainerProps> = ({ data }) => {
    const [cast, setCast] = useState(data);

    const [state, setState] = useState({
        loading: true,
        spinner: false
    })


    const handleToggle = () => {
        setState({ ...state, spinner: true });
        setTimeout(() => {

            cast.state === 1 ? setCast({ ...cast, state: 2 }) : setCast({ ...cast, state: 1 })

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
    let castState;

    if (cast.state === 0) { dotState = <span className="dot dot-disabled"> </span>; castState = CastOff };
    if (cast.state === 1) { dotState = <span className="dot dot-active"> </span>; castState = CastOn };
    if (cast.state === 2) { dotState = <span className="dot dot-idle"> </span>; castState = CastOff };

    return (
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" style={{ height: '200px' }}>
            {!state.loading ? (
                <>
                    <IonItem>
                        <Heading as="h6" size="md" style={{ fontWeight: 'normal' }}>
                            {cast.name ? cast.name : "Cast device #" + cast.token}
                            {dotState}
                            {state.spinner ? <Spinner size="xs" className="ml-3" /> : ""}
                        </Heading>


                        <IonButton fill="clear" slot="end" onClick={() => { console.log("view " + cast.token) }}>
                            <IonIcon icon={menuOutline} size="lg"></IonIcon>
                        </IonButton>
                    </IonItem>

                    <IonCardContent>

                        <img className="cast" src={castState} onClick={() => { handleToggle() }} alt="Light icon"></img>


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

export default Cast;

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