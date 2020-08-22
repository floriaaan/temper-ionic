import React, { useState } from 'react'
import { authenticator } from "otplib";
import qrcode from 'qrcode';

import { IonItem, IonLabel, IonToggle, IonPopover, IonIcon } from "@ionic/react";
import { lockClosedOutline } from 'ionicons/icons';
const secret = process.env.REACT_APP_OTP_SECRET || "secret40TP__!";

const token = authenticator.generate(secret);

try {
  const isValid = authenticator.verify({ token, secret });
} catch (err) {
  // Possible errors
  // - options validation
  // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
  console.error(err);
}




export const OTP: React.FC = () => {
  const auth_json = JSON.parse(
    sessionStorage.getItem("auth") ||
    `{"user": {"name": "","email": ""},"token": ""}`
  );

  const otpauth = authenticator.keyuri(auth_json.user.email, 'Temper', secret);
  const [state, setState] = useState({
    popover: false,
    image: ''
  });
  let image = '';

  qrcode.toDataURL(otpauth, (err: any, imageUrl: any) => {
    if (err) {
      console.log('Error with QR');
      return;
    }
    image = imageUrl;
  });


  let otp_json = JSON.parse(
    localStorage.getItem("otp") || `{"active": "false"}`
  );
  const [otpActive, setOtpActive] = useState(otp_json.active);
  const handleActivateOTP = (checked: boolean) => {
    setOtpActive(checked);
    otp_json.active = checked;
    sessionStorage.setItem("dev", JSON.stringify(otp_json));
  };


  return (
    <>
      <IonItem button>

        <IonIcon icon={lockClosedOutline} slot="start"></IonIcon>
        <IonLabel onClick={() => setState({ ...state, popover: true })}>Activate OTP authentication system</IonLabel>
        <IonToggle
          checked={otpActive}
          onIonChange={(e) => handleActivateOTP(e.detail.checked)}
          slot="end"
        ></IonToggle>
      </IonItem>
      <IonPopover
        isOpen={state.popover}
        cssClass='my-custom-class'
        onDidDismiss={e => setState({ ...state, popover: false })}
      >
        <img src={image} alt="QRCode for OTP auth" />
      </IonPopover>
    </>
  )
}

