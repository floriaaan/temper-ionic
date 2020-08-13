import React, { useState, useEffect } from "react";
import "./Probe.css";
import {
  IonRow,
  IonCol,
  IonContent,
  IonSkeletonText,
  IonSearchbar,
  IonModal,
  IonButton,
  IonSpinner,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonListHeader,
  IonList
} from "@ionic/react";
import Probe from "./Probe";
import { ToastContainer, toast } from "react-toastify";
import { addOutline, qrCodeOutline } from "ionicons/icons";
import CategoryHeader from "../../Layout/CategoryHeader";

import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";


import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";


library.add(faTemperatureHigh);

interface ContainerProps {
  token: string;
}

const ProbeList: React.FC<ContainerProps> = ({ token }) => {
  let tokens: string[] = [];
  let any: any[] = [];
  const [dataList, setDataList] = useState(any);
  const [probes, setProbesState] = useState({
    loading: true,
    content: [<React.Fragment key={0}></React.Fragment>],
    addmodal: {
      show: false,
      spinner: false,
      input: {
        name: '',
        category: '',
        gps: {
          lat: 9999,
          lng: 9999,
        }
      }
    },
    addtokenmodal: {
      show: false,
      spinner: false,
      inputtoken: "",
    },
    search: ""
  })

  let auth_json = JSON.parse(
    sessionStorage.getItem("auth") ||
    `{"user": {"name": "","email": ""},"token": ""}`
  );

  const reRender = () => {
    //console.log("### RE-RENDERING ###");
    const cards = dataList.map((obj, key) => {
      return (
        <li className="list-inline-item list--inline--item" key={key}>
          <Probe data={obj} token={tokens[key]}
          />
        </li>
      );
    });

    setProbesState({ ...probes, content: cards, loading: false })


  };

  const fetchData = async () => {
    const response = await fetch(
      "http://" + window.location.hostname + ":8000/api/v1/probe/user/" + token
    );
    const body = await response.json();

    tokens = body.response.data;
    let data = await Promise.all(tokens.map(async (tok, key) => {
      let responseProbe = await fetch("http://" + window.location.hostname + ":8000/api/v1/probe/" + tok)
      let bodyProbe = await responseProbe.json();
      //console.log(bodyProbe);

      return bodyProbe.response.data
    })) || [];
    //console.log('probes', data);
    setDataList(data);
    //console.log(dataList)
    setProbesState({ ...probes, loading: false });
    reRender();
  }


  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [probes.loading]);


  const handleSearch = (value: string) => {
    setProbesState({ ...probes, search: value });
  };
  const castPopover = (
    <>
      <IonList>
        <IonListHeader className="mb-2">Probes</IonListHeader>
        <IonItem
          button
          onClick={() =>
            setProbesState({
              ...probes,
              addmodal: { ...probes.addmodal, show: true },
            })
          }
        >
          <IonIcon icon={addOutline}></IonIcon>
          <IonLabel className="ml-3">Add a probe</IonLabel>
        </IonItem>
        <IonItem
          button
          onClick={() =>
            setProbesState({
              ...probes,
              addtokenmodal: { ...probes.addtokenmodal, show: true },
            })
          }
        >
          <IonIcon icon={qrCodeOutline}></IonIcon>
          <IonLabel className="ml-3">Add a shared probe</IonLabel>
        </IonItem>
      </IonList>
    </>
  );

  const addPost = () => {
    setProbesState({
      ...probes,
      addmodal: { ...probes.addmodal, spinner: true },
    });
    fetch("http://" + window.location.hostname + ":8000/api/v1/probe/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: auth_json.token,
        name: probes.addmodal.input.name,
        category: probes.addmodal.input.name,
        gps_lon: probes.addmodal.input.gps.lng === 9999 ? null : probes.addmodal.input.gps.lng,
        gps_lat: probes.addmodal.input.gps.lat === 9999 ? null : probes.addmodal.input.gps.lat,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.response) {
          setProbesState({
            ...probes,
            addmodal: {
              ...probes.addmodal,
              spinner: false,
              show: false,
              input: {
                ...probes.addmodal.input,
                name: '',
                category: ''
              }
            },
          })
          fetchData();
          toast.success("✅ Probe is successfully added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("⛔ Error while adding the probe", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

      });
  };

  const tokenPost = () => {
    setProbesState({
      ...probes,
      addtokenmodal: { ...probes.addtokenmodal, spinner: true },
    });
    fetch("http://" + window.location.hostname + ":8000/api/v1/share/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: auth_json.token,
        share: probes.addtokenmodal.inputtoken,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.response) {
          setProbesState({
            ...probes,
            addtokenmodal: { ...probes.addtokenmodal, inputtoken: '' },
          });
          fetchData();
          toast.success("✅ Probe is successfully added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("⛔ Error while adding the probe", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setProbesState({
          ...probes,
          addtokenmodal: { ...probes.addtokenmodal, show: false, spinner: false },
        });
      });
  };

  const handleGPSSelection = (e: LeafletMouseEvent) => {
    setProbesState({
      ...probes,
      addmodal: {
        ...probes.addmodal,
        input: {
          ...probes.addmodal.input,
          gps: e.latlng
        }
      }
    })
  }

  return (
    <>
      <IonContent className="ml-5 cast--content--height">
        <CategoryHeader
          title="Probes"
          icon="temperature-high"
          menu={castPopover}
          chip=""
        ></CategoryHeader>
        <IonSearchbar
          value={probes.search}
          onIonChange={(e) => handleSearch(e.detail.value!)}
          showCancelButton="focus"
          animated
        ></IonSearchbar>
        {!probes.loading ? (
          <>
            <div className="row align-content-center p-4 list--inline--wrapper mr-3">
              <ul className="list-inline mr-5">{probes.content}</ul>
            </div>
          </>
        ) : (
            <>
              <IonSkeletonText animated style={{ height: "30vh" }} />
            </>
          )}
      </IonContent>

      <IonModal isOpen={probes.addmodal.show} cssClass="modal-create">
        <IonContent>
          <div className="p-3">
            <IonRow>
              <IonCol sizeLg="6">
                <div className="display-5" style={{ fontFamily: "Nunito" }}>
                  Details of {probes.addmodal.input.name ? probes.addmodal.input.name : "probe"}
                </div>

                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    value={probes.addmodal.input.name}
                    onIonChange={(e) => setProbesState({
                      ...probes,
                      addmodal: {
                        ...probes.addmodal,
                        input: {
                          ...probes.addmodal.input,

                          name: e.detail.value!,
                        }
                      }
                    })}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Category</IonLabel>
                  <IonInput
                    value={probes.addmodal.input.category}
                    onIonChange={(e) => setProbesState({
                      ...probes,
                      addmodal: {
                        ...probes.addmodal,
                        input: {
                          ...probes.addmodal.input,
                          category: e.detail.value!,
                        }
                      }
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol sizeLg="6">
                <div className="display-6" style={{ fontFamily: "Nunito" }}>
                  Location of {probes.addmodal.input.name ? probes.addmodal.input.name : "probe"}
                </div>
                <Map
                  center={[43, 1]}
                  zoom={3}
                  style={{ height: "200px", width: "99%" }}
                  onclick={(e) => handleGPSSelection(e)}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Temper 💞"
                  />
                  {
                    probes.addmodal.input.gps.lat !== 9999 && probes.addmodal.input.gps.lng !== 9999 ?
                      <Marker position={[probes.addmodal.input.gps.lat!, probes.addmodal.input.gps.lng!]}></Marker> :
                      ""
                  }

                </Map>
              </IonCol>
            </IonRow>
            <hr className="mx-2 my-4" />

            <IonButton color="success" onClick={() => addPost()}>
              Validate
                {probes.addmodal.spinner ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                  ""
                )}
            </IonButton>
            <IonButton
              color="secondary"
              slot="end"
              onClick={() => setProbesState({ ...probes, addmodal: { ...probes.addmodal, show: false } })}
            >
              Close
              </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal isOpen={probes.addtokenmodal.show}>
        <IonContent className="ion-padding">
          <div className="p-3">
            <IonItem>
              <IonInput
                value={probes.addtokenmodal.inputtoken}
                placeholder="Access token"
                onIonChange={(e) =>
                  setProbesState({
                    ...probes,
                    addtokenmodal: {
                      ...probes.addtokenmodal,
                      inputtoken: e.detail.value!,
                    },
                  })
                }
                className="my-3"
              ></IonInput>
            </IonItem>
            <IonButton color="success" onClick={() => tokenPost()}>
              Validate
              {probes.addtokenmodal.spinner ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                  ""
                )}
            </IonButton>
            <IonButton
              color="dark"
              fill="outline"
              slot="end"
              onClick={() =>
                setProbesState({
                  ...probes,
                  addtokenmodal: { ...probes.addtokenmodal, show: false },
                })
              }
            >
              Close
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ProbeList;
