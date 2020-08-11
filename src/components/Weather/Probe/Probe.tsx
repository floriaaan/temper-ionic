import React, { useState } from "react";
import "./Probe.css";
import "leaflet/dist/leaflet.css"

import {
  IonCard,
  IonItem,
  IonButton,
  IonCardContent,
  IonSkeletonText,
} from "@ionic/react";

import moment from "moment";

import { useHistory } from "react-router-dom";
import { Heading } from "@chakra-ui/core";



interface ContainerProps {
  token: string;
  data: {
    id: number,
    name: string,
    state: boolean,
    category: string,
    lastMeasure: {
      temperature: number,
      humidity: number,
      date: string
    } | null,
    gps: {
      lon: number | null,
      lat: number | null
    } | null
  }
}

const Probe: React.FC<ContainerProps> = ({ token, data }) => {
  const [probe, setProbeData] = useState(data);
  const [state, setState] = useState({
    loading: false,
    spinner: false
  })

  const handleToggle = () => {
    setState({ ...state, spinner: true });
    fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + token + "/toggle", {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        setProbeData({ ...probe, state: result.response.data.state });
        setState({ ...state, spinner: false });
      });


  };

  

  const history = useHistory();
  const navigateTo = () => history.push('/probe/' + token);

  return (
    <IonCard>
      {!state.loading ? (
        <>
          <IonItem>
            <Heading as="h3" size="md">
              {probe.name ? probe.name : "Probe #" + probe.id}
            </Heading>
            
            <IonButton fill="outline" slot="end" onClick={() => navigateTo()}>
              VIEW
            </IonButton>
          </IonItem>

          <IonCardContent>

          </IonCardContent>
        </>
      ) : (
          <>
            <IonItem>
              <IonSkeletonText animated></IonSkeletonText>
            </IonItem>

            <IonCardContent>
              <IonSkeletonText
                animated
                style={{ heigth: "100px" }}
              ></IonSkeletonText>
            </IonCardContent>
          </>
        )}
    </IonCard>
  );
};

export default Probe;
