import React, { useState, useEffect } from "react";
import "./Place.css";

import {
  IonItem,
  IonButton,
  IonCardContent,
  IonSkeletonText,
  IonIcon,
} from "@ionic/react";

//import moment from "moment";
import cx from "classnames";

import { useHistory } from "react-router-dom";
import { Heading, Box, Spinner } from "@chakra-ui/core";
import { menuOutline } from "ionicons/icons";

interface ContainerProps {
  token: string;
  data: {
    id: number;
    name: string;
    state: boolean;
    category: string;
    lastmeasure: {
      temperature: number;
      humidity: number;
      date: string;
    } | null;
    gps: {
      lon: number | null;
      lat: number | null;
    } | null;
  };
}

interface ApiResponse {
  coord: {
    lon: number | null;
    lat: number | null;
  } | null;
  weather: {
    id: number | null;
    main: string | null;
    description: string | null;
    icon: string | null;
  };
  base: string | null;
  main: {
    temp: number | null;
    feels_like: number | null;
    temp_min: number | null;
    temp_max: number | null;
    pressure: number | null;
    humidity: number | null;
  };
  visibility: number | null;
  wind: {
    speed: number | null;
    deg: number | null;
  };
  clouds: {
    all: number | null;
  };
  dt: number | null;
  sys: {
    type: number | null;
    id: number | null;
    country: string | null;
    sunrise: number | null;
    sunset: number | null;
  };
  timezone: number | null;
  id: number | null;
  name: string | null;
  cod: number | null;
}

const Place: React.FC<ContainerProps> = ({ token, data }) => {
  const [place, setPlaceData] = useState(data);
  const [api, setApiResponse] = useState<ApiResponse>();
  const [state, setState] = useState({
    loading: false,
    spinner: false,
  });

  const apiCall = async () => {
    const resp = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        place.name +
        "&appid="+ process.env.OWEATHER_API_KEY +""
    );
    const body = await resp.json();
    setApiResponse(body);
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="0px"
      rounded="lg"
      overflow="hidden"
      style={{ height: "200px" }}
    >
      {!state.loading ? (
        <>
          <IonItem>
            <Heading as="h6" size="md" style={{ fontWeight: "normal" }}>
              {place.name ? place.name : "Place #" + token}
            </Heading>

            <IonButton
              fill="clear"
              slot="end"
              onClick={() => {
                console.log("actions");
              }}
            >
              <IonIcon icon={menuOutline} size="lg"></IonIcon>
            </IonButton>
          </IonItem>

          <IonCardContent className="weather-container">
            <div
              className={cx("weather-card", {
                "weather-sunny": place.state,
                "weather-cloudy": !place.state,
              })}
            >
              {api?.main ? (
                <>
                  <div
                    className={cx("weather-icon", {
                      sun: place.state,
                      cloud: !place.state,
                    })}
                  />
                  <h1>{Math.round((api.main.temp! - 273.15) * 100) / 100}°C</h1>
                  <p>{api.main.humidity} %</p>
                </>
              ) : (
                ""
              )}
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
  );
};

export default Place;
