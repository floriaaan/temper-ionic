import React, { useState, useEffect } from "react";
import Cast from "./Cast";
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
import { faChromecast } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";

import "./List.css";
import { addOutline, qrCodeOutline } from "ionicons/icons";

library.add(faChromecast);

interface ContainerProps {
  token: string;
}

const falseList = ["cast1", "cast2"];

const CastList: React.FC<ContainerProps> = ({ token }) => {
  const CastCards = falseList.map((token, key) => {
    return (
      <li className="list-inline-item list--inline--item" key={key}>
        <Cast
          data={{
            id: key + 1,
            token: token,
            name: "Token " + token,
            category: "Category",
            state: 0,
            status: "Idle",
          }}
        />
      </li>
    );
  });
  const [casts, setCastsState] = useState({
    loading: true,
    content: CastCards,
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
    setCastsState({
      ...casts,
      addmodal: { ...casts.addmodal, show: false },
    });
  };

  const tokenPost = () => {
    setCastsState({
      ...casts,
      addtokenmodal: { ...casts.addtokenmodal, show: false },
    });
  };
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setCastsState({ ...casts, loading: false });
    }, 1000);
    //eslint-disable-next-line
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const castPopover = (
    <>
      <IonList>
        <IonListHeader className="mb-2">Casts</IonListHeader>
        <IonItem
          button
          onClick={() =>
            setCastsState({
              ...casts,
              addmodal: { ...casts.addmodal, show: true },
            })
          }
        >
          <IonIcon icon={addOutline}></IonIcon>
          <IonLabel className="ml-3">Add a cast</IonLabel>
        </IonItem>
        <IonItem
          button
          onClick={() =>
            setCastsState({
              ...casts,
              addtokenmodal: { ...casts.addtokenmodal, show: true },
            })
          }
        >
          <IonIcon icon={qrCodeOutline}></IonIcon>
          <IonLabel className="ml-3">Add a shared cast</IonLabel>
        </IonItem>
      </IonList>
    </>
  );

  return (
    <>
      <IonContent className="ml-5 cast--content--height">
        <CategoryHeader
          title="Casts"
          icon={["fab", "chromecast"]}
          menu={castPopover}
          chip=""
        ></CategoryHeader>
        <IonSearchbar
          value={search}
          onIonChange={(e) => handleSearch(e.detail.value!)}
          showCancelButton="focus"
          animated
        ></IonSearchbar>
        {!casts.loading ? (
          <>
            <div className="row align-content-center p-4 list--inline--wrapper mr-3">
              <ul className="list-inline mr-5">{casts.content}</ul>
            </div>
          </>
        ) : (
          <>
            <IonSkeletonText animated style={{ height: "30vh" }} />
          </>
        )}
      </IonContent>

      <IonModal isOpen={casts.addmodal.show} cssClass="modal-create">
        <IonContent>
          <div className="p-3">
            <hr className="mx-2 my-4" />

            <IonButton color="success" onClick={() => addPost()}>
              Validate
              {casts.addmodal.spinner ? (
                <IonSpinner name="crescent" className="ml-3" />
              ) : (
                ""
              )}
            </IonButton>
            <IonButton
              color="secondary"
              slot="end"
              onClick={() =>
                setCastsState({
                  ...casts,
                  addmodal: { ...casts.addmodal, show: false },
                })
              }
            >
              Close
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal isOpen={casts.addtokenmodal.show}>
        <IonContent className="ion-padding">
          <div className="p-3">
            <IonItem>
              <IonInput
                value={casts.addtokenmodal.inputtoken}
                placeholder="Access token"
                onIonChange={(e) =>
                  setCastsState({
                    ...casts,
                    addtokenmodal: {
                      ...casts.addtokenmodal,
                      inputtoken: e.detail.value!,
                    },
                  })
                }
                className="my-3"
              ></IonInput>
            </IonItem>
            <IonButton color="success" onClick={() => tokenPost()}>
              Validate
              {casts.addtokenmodal.spinner ? (
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
                setCastsState({
                  ...casts,
                  addtokenmodal: { ...casts.addtokenmodal, show: false },
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

export default CastList;
