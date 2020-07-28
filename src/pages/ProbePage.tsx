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
  IonButton,
  IonActionSheet,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonModal,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonList,
  IonText,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import {
  arrowUpCircle,
  time,
  rainy,
  thermometer,
  trash,
  share,
  heart,
  close,
  chevronBackOutline,
  ellipsisVerticalOutline,
  personOutline,
} from "ionicons/icons";

import {
  Heading,
  Stack,
  StatGroup,
  Stat,
  StatArrow,
  StatLabel,
  StatHelpText,
  StatNumber,
  Box,
} from "@chakra-ui/core";

import moment from "moment";

import QRCode from "qrcode.react";

import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./ProbePage.css";

const ProbePage: React.FC = () => {
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  const history = useHistory();
  const navigateTo = (url: string) => history.push(url);

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
  const [owner, setOwner] = useState({ name: "", email: "", loading: true });
  const [loading, setLoading] = useState(true);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrJson, setQRJSON] = useState({ token: id, duration: "1day" });

  /*const handleScroll = (e: any) => {
    let scroll = document.querySelector("#scroll")!;

    if (e.detail.scrollTop > 20) {
      scroll.classList.remove("d-none");
    } else {
      scroll.classList.add("d-none");
    }
  };*/

  const fetchMeasures = async () => {
    await fetch(
      "http://" +
      window.location.hostname +
      ":8000/api/v1/measure/probe/" +
      id +
      "_limit=6"
    )
      .then((res) => res.json())
      .then((res) => {
        setMeasures(
          res.response.data || [{ temperature: 0, humidity: 0, date: "" }]
        );
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
  const fetchOwner = async () => {
    await fetch(
      "http://" +
      window.location.hostname +
      ":8000/api/v1/probe/" +
      id +
      "/owner"
    )
      .then((res) => res.json())
      .then((res) => {
        setOwner(
          {
            name: res.response.data.name,
            email: res.response.data.email,
            loading: false,
          } || { name: "Unable to fetch", email: "", loading: false }
        );
      });
  };

  useEffect(() => {
    fetchData();
    fetchMeasures();
    fetchOwner();
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

  const isGPS = (
    <Map center={[43, 1]} zoom={12} style={{ height: "50vh", width: "99%" }}>
      <TileLayer
        attribution="Temper 💞"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <React.Fragment>
        {""}
        <Marker position={[gps.lon, gps.lat]}></Marker>
      </React.Fragment>
    </Map>
  );

  const notGPS = "";

  const map = gps.lon && gps.lat ? isGPS : notGPS;

  return (
    <IonPage>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => { }}
        onIonScroll={(e) => {
          //handleScroll(e);
        }}
        onIonScrollEnd={() => { }}
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
              className="has-card-footer"
              style={{ height: "83vh", width: "90%", textAlign: "start" }}
            >
              <IonCardHeader>
                <IonCardTitle>
                  {!loading ? (
                    <IonItem>
                      <IonButton
                        fill="clear"
                        onClick={() => navigateTo("/probes")}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={chevronBackOutline}
                        ></IonIcon>
                      </IonButton>
                      <div className="display-4 ml-3" style={{ fontFamily: 'Nunito' }}>
                        {name ? name : "Sonde #" + id}
                      </div>

                      <IonButton
                        fill="clear"
                        onClick={() => setShowActionSheet(true)}
                        slot="end"
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={ellipsisVerticalOutline}
                        ></IonIcon>
                      </IonButton>
                    </IonItem>
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
                  map
                ) : (
                    <>
                      <IonSkeletonText animated style={{ height: "50vh" }} />
                    </>
                  )}
              </IonCardContent>

              <IonRow className="ion-card-footer">
                <IonCol>
                  <IonIcon
                    icon={time}
                    className="mr-2"
                    color="tertiary"
                  ></IonIcon>
                  {loading ? (
                    <IonSkeletonText
                      animated
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  ) : createdAt ? (
                    "Created " + moment(createdAt).fromNow()
                  ) : (
                        ""
                      )}
                </IonCol>
                <IonCol>
                  <IonIcon
                    icon={personOutline}
                    className="mx-2"
                    color="tertiary"
                  ></IonIcon>
                  Owner :{" "}
                  {owner.loading ? (
                    <IonSkeletonText
                      animated
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  ) : (
                      owner.name + (owner.email ? " - " + owner.email : "")
                    )}
                </IonCol>
              </IonRow>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonRefresher slot="fixed" onIonRefresh={doMeasuresRefresh}>
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonCard
              style={{ height: "83vh", width: "90%", textAlign: "start" }}
            >
              <IonCardHeader>
                <IonCardTitle>
                  <Heading as="h1" size="2xl" className="ml-3">
                    Measures of {name}
                  </Heading>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <Stack spacing={4}>
                  {measures.map((obj, key) => {
                    let index = key - 1 === -1 ? 0 : key - 1;
                    let tPercent =
                      ((obj.temperature! - measures[index].temperature!) /
                        measures[index].temperature!) *
                      100;
                    let hPercent =
                      ((obj.humidity! - measures[index].humidity!) /
                        measures[index].humidity!) *
                      100;
                    tPercent = Math.round(tPercent * 100) / 100;
                    hPercent = Math.round(hPercent * 100) / 100;

                    return (
                      <Box p={5} borderWidth="1px" key={key}>
                        <StatGroup>
                          <Stat>
                            <StatLabel>
                              <IonIcon
                                icon={thermometer}
                                className="mr-2"
                                color="primary"
                              ></IonIcon>
                              Temperature
                            </StatLabel>
                            <StatNumber
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                              }}
                            >
                              {obj.temperature} °C
                            </StatNumber>
                            <StatHelpText>
                              <StatArrow
                                type={tPercent >= 0 ? "increase" : "decrease"}
                              />
                              {tPercent} %
                            </StatHelpText>
                          </Stat>

                          <Stat>
                            <StatLabel>
                              <IonIcon
                                icon={rainy}
                                className="mr-2"
                                color="secondary"
                              ></IonIcon>
                              Humidty
                            </StatLabel>
                            <StatNumber
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                              }}
                            >
                              {obj.humidity} %
                            </StatNumber>
                            <StatHelpText>
                              <StatArrow
                                type={hPercent >= 0 ? "increase" : "decrease"}
                              />
                              {hPercent} %
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>
                              <IonIcon
                                icon={time}
                                className="mr-2"
                                color="tertiary"
                              ></IonIcon>
                              Date
                            </StatLabel>
                            <StatNumber
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                              }}
                            >
                              {moment(obj.date).fromNow()}
                            </StatNumber>
                            <StatHelpText>
                              {moment(obj.date).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </StatHelpText>
                          </Stat>
                        </StatGroup>
                      </Box>
                    );
                  })}
                </Stack>
              </IonCardContent>
            </IonCard>
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

        <IonModal isOpen={showQR} cssClass="modal-qrcode">
          <div className="p-5">


            <IonText className="display-6" style={{ fontFamily: 'Nunito' }}>
              Share via QR Code
            </IonText>

            <div className="w-100 mt-3">
              <QRCode
                value={JSON.stringify(qrJson)}
                size={150}
                includeMargin={true}
                bgColor={"#eeeeee"}
                className="mx-auto mb-2"
              ></QRCode>
            </div>
            <IonList>
              <IonRadioGroup
                value={qrJson.duration}
                onIonChange={(e) =>
                  setQRJSON({ token: id, duration: e.detail.value })
                }
              >
                <IonListHeader>
                  <IonLabel>Duration of the share</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>1 day</IonLabel>
                  <IonRadio slot="start" value="1day" />
                </IonItem>

                <IonItem>
                  <IonLabel>1 week</IonLabel>
                  <IonRadio slot="start" value="1week" />
                </IonItem>

                <IonItem>
                  <IonLabel>1 month</IonLabel>
                  <IonRadio slot="start" value="1month" />
                </IonItem>

                <IonItem>
                  <IonLabel>Always</IonLabel>
                  <IonRadio slot="start" value="always" />
                </IonItem>
              </IonRadioGroup>
            </IonList>

            <IonButton
              fill="outline"
              color="danger"
              expand="block"
              onClick={() => setShowQR(false)}
            >
              <IonIcon icon={close}></IonIcon>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                console.log("Delete clicked");
              },
            },
            {
              text: "Share with your friends",
              icon: share,
              handler: () => {
                setShowQR(true);
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
                setShowActionSheet(false);
              },
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default ProbePage;
