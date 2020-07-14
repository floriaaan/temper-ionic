import React, { useEffect, useState } from "react";

import { RefresherEventDetail } from "@ionic/core";
import {
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonContent,
  IonSlides,
  IonSlide,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonSkeletonText,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import { arrowUpCircle } from "ionicons/icons";

import { Heading, Stack } from "@chakra-ui/core";

import moment from "moment";

import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./ProbePage.css";

const ProbePage: React.FC = () => {
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  const [name, setName] = useState();
  const [createdAt, setCreatedAt] = useState("");
  const [state, setState] = useState();
  const [category, setCategory] = useState();
  const [measures, setMeasures] = useState([
    {
      temperature: null,
      humidity: null,
      date: null,
    },
  ]);
  const [gps, setGPS] = useState({
    lon: 0,
    lat: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleScroll = (e: any) => {
    let scroll = document.querySelector("#scroll")!;

    if (e.detail.scrollTop > 20) {
      scroll.classList.remove("d-none");
    } else {
      scroll.classList.add("d-none");
    }
  };

  const fetchMeasures = async () => {
    await fetch(
      "http://" +
        window.location.hostname +
        ":8000/api/v1/measure/probe/" +
        id +
        "_limit=15"
    )
      .then((res) => res.json())
      .then((res) => {
        setMeasures(res.response.data.lastmeasure);
      });
  };
  const fetchData = async () => {
    await fetch(
      "http://" + window.location.hostname + ":8000/api/v1/probe/" + id
    )
      .then((res) => res.json())
      .then((res) => {
        setName(res.response.data.name);
        setState(res.response.data.state);
        setCategory(res.response.data.category);
        setGPS(res.response.data.gps);
        setCreatedAt(res.response.data.created_at);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    fetchMeasures();
    // eslint-disable-next-line
  }, []);

  const scrollToTop = () => {
    document.querySelector("ion-content")!.scrollToTop(500);
  };

  const doMeasuresRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    fetchMeasures().then(() => {
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={(e) => {
          handleScroll(e);
        }}
        onIonScrollEnd={() => {}}
      >
        <IonSlides
          pager={true}
          options={{
            initialSlide: 0,
            speed: 400,
          }}
        >
          <IonSlide>
            <IonCard
              style={{ height: "83vh", width: "90%", textAlign: "start" }}
            >
              <IonCardHeader>
                <IonCardTitle>
                  {!loading ? (
                    <Heading as="h1" size="2xl" className="ml-3">
                      {name ? name : "Sonde #" + id}
                    </Heading>
                  ) : (
                    <IonSkeletonText
                      animated
                      style={{ height: "10vh" }}
                    ></IonSkeletonText>
                  )}
                </IonCardTitle>

                <IonCardSubtitle>
                  {!loading ? (
                    <>
                      <IonChip outline={true} className="mx-3" color="warning">
                        {category}
                      </IonChip>

                      <IonChip color={state ? "success" : "danger"}>
                        {state ? "Active" : "Disabled"}
                      </IonChip>
                    </>
                  ) : (
                    <IonSkeletonText
                      animated
                      style={{ height: "10vh" }}
                    ></IonSkeletonText>
                  )}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                
                {!loading ? (
                    <Map center={[43, 1]} zoom={3} style={{height: '65vh', width: '99%'}}>
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <React.Fragment>
                          {JSON.stringify(gps)}
                        <Marker position={[gps.lon, gps.lat]}></Marker>
                      </React.Fragment>
                    </Map>
                ) : (
                  <>
                    <IonSkeletonText animated style={{ height: "50vh" }} />
                  </>
                )}
                {createdAt ? "Created " + moment(createdAt).fromNow() : ""}
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonRefresher slot="fixed" onIonRefresh={doMeasuresRefresh}>
              <IonRefresherContent>
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>Destination</IonCardSubtitle>
                    <IonCardTitle>Madison, WI</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Founded in 1829 on an isthmus between Lake Monona and Lake
                    Mendota, Madison was named the capital of the Wisconsin
                    Territory in 1836.
                  </IonCardContent>
                </IonCard>
              </IonRefresherContent>
            </IonRefresher>
            Measures of probe
            <Stack spacing={8}></Stack>
            {JSON.stringify(measures)}
          </IonSlide>
          <IonSlide>Settings of probe</IonSlide>
        </IonSlides>

        <IonFab
          horizontal="end"
          vertical="bottom"
          slot="fixed"
          id="scroll"
          className="d-none"
        >
          <IonFabButton color="dark" onClick={() => scrollToTop()}>
            <IonIcon icon={arrowUpCircle}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ProbePage;
