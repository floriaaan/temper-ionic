import React from 'react'

import Logo from '../../theme/temper.svg'
import Avatar from '@chakra-ui/core/dist/Avatar';
import "./Header.css";
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { settingsOutline, listOutline } from 'ionicons/icons';

interface ContainerProps {
    title: string;
    version: number;
}

const Header: React.FC<ContainerProps> = ({ title, version }) => {
    let auth_json = JSON.parse(
        sessionStorage.getItem("auth") ||
        `{"user": {"name": "","email": ""},"token": ""}`
    );
    let user = auth_json.user;



    const history = useHistory();
    const navigateTo = (url: string) => { if (url !== window.location.pathname) history.push(url) };

    if (version === 1) {
        return (
            <div className="row mx-1 align-items-center header--props">
                <div className="col-2">
                    <img src={Logo} className="header--logo" alt="Temper"></img>
                </div>

                <div className="col-8 header--title">
                    {title}
                </div>

                <div className="col-2 justify-content-center">
                    <Avatar
                        className="p-4 header--avatar"
                        size="md"
                        name={user.name}
                        src=""
                        textAlign="center"
                        onClick={() => navigateTo('/user')}
                    />
                </div>

            </div>
        );
    } else if (version === 2) {
        return (
            <div className="row mx-1 my-3 align-items-center header--props">
                <div className="col-8 header--title">
                    {title}
                </div>

                <div className="col-4 d-flex flex-row-reverse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <IonButton fill="clear" onClick={() => console.log("change dispositions to list")}>
                                <IonIcon icon={listOutline}></IonIcon>
                            </IonButton>
                            <IonButton fill="clear" onClick={() => navigateTo('/settings')}>
                                <IonIcon icon={settingsOutline}></IonIcon>
                            </IonButton>
                            <Avatar
                                className="p-4 header--avatar headerv2--avatar mx-2"
                                size="xs"
                                name={user.name}
                                src=""
                                textAlign="center"
                                onClick={() => navigateTo('/user')}
                            />


                        </li>
                    </ul>

                </div>

            </div>
        )
    } else if (version === 2.1) {
        return (
            <div className="row mx-1 my-3 align-items-center header--props">
                <div className="col-8 header--title">
                    {title}
                </div>

                <div className="col-4 d-flex flex-row-reverse">
                    <ul className="navbar-nav">
                        <li className="nav-item">

                            <IonButton fill="clear" onClick={() => {
                                navigateTo("/settings");
                            }}>
                                <IonIcon icon={settingsOutline}></IonIcon>
                            </IonButton>
                            <Avatar
                                className="p-4 header--avatar headerv2--avatar mx-2"
                                size="xs"
                                name={user.name}
                                src=""
                                textAlign="center"
                                onClick={() => navigateTo('/user')}
                            />


                        </li>
                    </ul>

                </div>

            </div>
        )
    } else if (version === -1) {
        return (
            <div className="row mx-1 p-5 align-items-center header--props">
                <div className="col-2">
                    <img src={Logo} className="header--logo" alt="Temper"></img>
                </div>

                <div className="col-8 p-5 header--title">
                    {title}
                </div>



            </div>
        );
    }

    return (
        <div className="row mx-1 p-3 align-items-center header--props">
            <div className="col-2">
                <img src={Logo} className="header--logo" alt="Temper"></img>
            </div>

            <div className="col-8 header--title">
                No header version specified
                </div>

            <div className="col-2 justify-content-center">
                <Avatar
                    className="p-4 header--avatar"
                    size="md"
                    name={user.name}
                    src=""
                    textAlign="center"
                    onClick={() => navigateTo('/user')}
                />
            </div>

        </div>
    );


};

export default Header;