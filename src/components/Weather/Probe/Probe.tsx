import React, { useState } from "react";
import "./Probe.css";
import "leaflet/dist/leaflet.css"

import {
  IonItem,
  IonButton,
  IonCardContent,
  IonSkeletonText,
  IonIcon,
} from "@ionic/react";

//import moment from "moment";
import cx from 'classnames';

import { useHistory } from "react-router-dom";
import { Heading, Box, Spinner } from "@chakra-ui/core";
import { menuOutline } from "ionicons/icons";



interface ContainerProps {
  token: string;
  data: {
    id: number,
    name: string,
    state: boolean,
    category: string,
    lastmeasure: {
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
    <Box maxW="sm" borderWidth="0px" rounded="lg" overflow="hidden" style={{ height: '200px' }}>
      {!state.loading ? (
        <>
          <IonItem>
            <Heading as="h6" size="md" style={{ fontWeight: 'normal' }}>
              {probe.name ? probe.name : "Probe #" + token}
              {probe.state ? <span className="dot dot-active"> </span> : <span className="dot dot-disabled"></span>}
              {state.spinner ? <Spinner size="xs" className="ml-3" /> : ""}
            </Heading>


            <IonButton fill="clear" slot="end" onClick={() => { navigateTo() }}>
              <IonIcon icon={menuOutline} size="lg"></IonIcon>
            </IonButton>
          </IonItem>

          <IonCardContent className="weather-container">
            <div className={cx("weather-card", { "weather-sunny": probe.state, "weather-cloudy": !probe.state })} onClick={() => handleToggle()}>
              {probe.lastmeasure?.temperature ?
                (<><div className={cx('weather-icon', { sun: probe.state, cloud: !probe.state })} />
                  <h1>{probe.lastmeasure?.temperature}°C</h1>
                  <p>{probe.lastmeasure?.humidity} %</p></>)
                : ""}

            </div>
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
};

export default Probe;
