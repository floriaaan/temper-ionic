import React, { useState, useEffect } from "react";
import "./Place.css";

import {
  IonItem,
  IonButton,
  IonCardContent,
  IonSkeletonText,
  IonIcon,
  IonActionSheet,
} from "@ionic/react";

import cx from "classnames";
import { Heading, Box } from "@chakra-ui/core";
import { trash, heart, close, ellipsisVertical } from "ionicons/icons";

interface ContainerProps {
  data: {
    id: number;
    token: string;
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
  }[];
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

const Place: React.FC<ContainerProps> = ({ data }) => {
  const [place, setPlaceData] = useState(data);
  const [api, setApiResponse] = useState<ApiResponse>();
  const [state, setState] = useState({
    loading: false,
    spinner: false,
    actions: false,
  });

  const apiCall = async () => {
    const resp = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        place.name +
        "&appid=" +
        process.env.REACT_APP_OWEATHER_API_KEY +
        ""
    );
    const body = await resp.json();
    setApiResponse(body);
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleDelete = async () => {
    const resp = await fetch(
      "http://" + window.location.hostname + ":8000/api/v1/place/",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _token: place.token,
        }),
      }
    );
    const body = await resp.json();
    console.log(body);
  };

  return (
    <>
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
                {place.name ? place.name : "Place #" + place.token}
              </Heading>

              <IonButton
                fill="clear"
                slot="end"
                onClick={() => {
                  setState({ ...state, actions: true });
                }}
              >
                <IonIcon icon={ellipsisVertical} size="lg"></IonIcon>
              </IonButton>
            </IonItem>

            <IonCardContent className="weather-container">
              <div
                className={cx("weather-card", {
                  "weather-sunny":
                    api?.weather[0].id === 800 || api?.weather[0].id === 802,
                  "weather-cloudy": api?.weather[0].id === 803,
                  "weather-rainy": api?.weather[0].id === 805,
                })}
              >
                {api?.main ? (
                  <>
                    <div
                      className={cx("weather-icon", {
                        sunny:
                          api?.weather[0].id === 800 ||
                          api?.weather[0].id === 802,
                        cloudy: api?.weather[0].id === 803,
                        rainy: api?.weather[0].id === 805,
                      })}
                    />
                    <h1>
                      {Math.round((api.main.temp! - 273.15) * 100) / 100}°C
                    </h1>
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

      <IonActionSheet
        isOpen={state.actions}
        onDidDismiss={() => setState({ ...state, actions: false })}
        cssClass="my-custom-class"
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              handleDelete();
            },
          },
          {
            text: "Favorite",
            icon: heart,
            handler: () => {
              console.log("Favorite clicked");
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
            handler: () => {
              setState({ ...state, actions: false });
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
};

export default Place;
