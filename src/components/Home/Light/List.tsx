import React, { useState, useEffect } from "react";
import Light from "./Light";
import {
  IonContent,
  IonSearchbar,
  IonSkeletonText,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonModal,
  IonSpinner,
  IonInput,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import CategoryHeader from "../../Layout/CategoryHeader";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";

import "./List.css";
import { addOutline, qrCodeOutline } from "ionicons/icons";

library.add(faLightbulb);

interface ContainerProps {
  token: string;
}

const falseList = ["light1", "light2", "bulb", "sun"];

const LightList: React.FC<ContainerProps> = ({ token }) => {
  const LightCards = falseList.map((token, key) => {
    return (
      <li className="list-inline-item list--inline--item" key={key}>
        <Light
          data={{
            id: key + 1,
            token: token,
            name: "Token " + token,
            category: "Category",
            state: 0,
          }}
        />
      </li>
    );
  });
  const [lightState, setLState] = useState({
    loading: true,
    content: LightCards,
    addmodal: {
      show: false,
      spinner: false,
    },
    addtokenmodal: {
      show: false,
      spinner: false,
      inputtoken: "",
    },
  });

  const addPost = () => {
    setLState({
      ...lightState,
      addmodal: { ...lightState.addmodal, show: false },
    });
  };

  const tokenPost = () => {
    setLState({
      ...lightState,
      addtokenmodal: { ...lightState.addtokenmodal, show: false },
    });
  };
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setLState({ ...lightState, loading: false });
    }, 1000);
    //eslint-disable-next-line
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const lightPopover = (
    <>
      <IonList>
        <IonListHeader className="mb-2">Lights</IonListHeader>
        <IonItem
          button
          onClick={() =>
            setLState({
              ...lightState,
              addmodal: { ...lightState.addmodal, show: true },
            })
          }
        >
          <IonIcon icon={addOutline}></IonIcon>
          <IonLabel className="ml-3">Add a light</IonLabel>
        </IonItem>
        <IonItem
          button
          onClick={() =>
            setLState({
              ...lightState,
              addtokenmodal: { ...lightState.addtokenmodal, show: true },
            })
          }
        >
          <IonIcon icon={qrCodeOutline}></IonIcon>
          <IonLabel className="ml-3">Add a shared light</IonLabel>
        </IonItem>
      </IonList>
    </>
  );

  return (
    <>
      <IonContent className="ml-5 light--content--height">
        <CategoryHeader
          title="Lights"
          icon="lightbulb"
          menu={lightPopover}
          chip=""
        ></CategoryHeader>
        <IonSearchbar
          value={search}
          onIonChange={(e) => handleSearch(e.detail.value!)}
          showCancelButton="focus"
          animated
        ></IonSearchbar>
        {!lightState.loading ? (
          <>
            <div className="row align-content-center p-4 list--inline--wrapper mr-3">
              <ul className="list-inline mr-5">{lightState.content}</ul>
            </div>
          </>
        ) : (
          <>
            <IonSkeletonText animated style={{ height: "30vh" }} />
          </>
        )}
      </IonContent>

      <IonModal isOpen={lightState.addmodal.show} cssClass="modal-create">
        <IonContent>
          <div className="p-3">
            <hr className="mx-2 my-4" />

            <IonButton color="success" onClick={() => addPost()}>
              Validate
              {lightState.addmodal.spinner ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                ""
              )}
            </IonButton>
            <IonButton
              color="secondary"
              slot="end"
              onClick={() =>
                setLState({
                  ...lightState,
                  addmodal: { ...lightState.addmodal, show: false },
                })
              }
            >
              Close
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal isOpen={lightState.addtokenmodal.show}>
        <IonContent className="ion-padding">
          <div className="p-3">
            <IonItem>
              <IonInput
                value={lightState.addtokenmodal.inputtoken}
                placeholder="Access token"
                onIonChange={(e) =>
                  setLState({
                    ...lightState,
                    addtokenmodal: {
                      ...lightState.addtokenmodal,
                      inputtoken: e.detail.value!,
                    },
                  })
                }
                className="my-3"
              ></IonInput>
            </IonItem>
            <IonButton color="success" onClick={() => tokenPost()}>
              Validate
              {lightState.addtokenmodal.spinner ? (
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
                setLState({
                  ...lightState,
                  addtokenmodal: { ...lightState.addtokenmodal, show: false },
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

export default LightList;
