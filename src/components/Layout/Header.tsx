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
    const navigateToUser = () => history.push('/user/');

    if (version === 1) {
        return (
            <div className="row mx-1 p-3 align-items-center header--props">
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
                        onClick={() => navigateToUser()}
                    />
                </div>

            </div>
        );
    } else if (version === 2) {
        return (
            <div className="row mx-1 p-3 align-items-center header--props">
                <div className="col-8 header--title headerv2-title">
                    {title}
                </div>

                <div className="col-4 d-flex flex-row-reverse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <IonButton fill="clear" onClick={() => console.log("change dispositions to list")}>
                                <IonIcon icon={listOutline}></IonIcon>
                            </IonButton>
                            <IonButton fill="clear" onClick={() => console.log("view setttings")}>
                                <IonIcon icon={settingsOutline}></IonIcon>
                            </IonButton>
                            <Avatar
                                className="p-4 header--avatar headerv2--avatar mx-2"
                                size="xs"
                                name={user.name}
                                src=""
                                textAlign="center"
                                onClick={() => navigateToUser()}
                            />


                        </li>
                    </ul>

                </div>

            </div>
        )
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
                    onClick={() => navigateToUser()}
                />
            </div>

        </div>
    )


};

export default Header;