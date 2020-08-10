import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Header.css";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

interface ContainerProps {
    title: string;
    icon: IconProp;
    menu: JSX.Element;
    chip: string;
}

const Header: React.FC<ContainerProps> = ({ title, icon, menu, chip }) => {
    const [popover, setPopover] = useState(false)


    return (
        <>
            <div className="row mx-1 p-3 align-items-center header--props">
                <div className="col-1">
                    <FontAwesomeIcon icon={icon} color="var(--ion-color-primary)"></FontAwesomeIcon>
                </div>

                <div className="col-10">
                    <span className="headercategory--title">{title}</span>
                    {chip !== '' ?
                        <span className="badge bg-dark ml-3">{chip}</span> :
                        ""
                    }
                </div>
                <div className="col-1">
                    <IonButton fill="clear" slot="end" onClick={() => { setPopover(true) }}>
                        <IonIcon icon={addOutline} size="lg"></IonIcon>
                    </IonButton>
                </div>

            </div>

            <IonPopover
                isOpen={popover}
                cssClass="headercategory--popover--wrapper"
                onDidDismiss={e => setPopover(false)}
            >
                {menu}
            </IonPopover>
        </>

    );
};

export default Header;