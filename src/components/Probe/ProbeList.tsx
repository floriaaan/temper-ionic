import React, { useState, useEffect } from "react";
import "./ProbeList.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSkeletonText,
  IonSearchbar
} from "@ionic/react";
import Probe from "./Probe";

interface ContainerProps {
  token: string;
}

const ProbeList: React.FC<ContainerProps> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState<string>();


  useEffect(() => {
    async function fetchData() {
      await fetch(
        "http://" + window.location.hostname + ":8000/api/v1/probe/user/" + token
      )
        .then((res) => res.json())
        .then((res) => {
          setList(res.response.data);
          setLoading(false);
        });
    }

    fetchData();
  }, [token]);

  let probeCards = list.map((token, key) => {
    return (
      <IonCol sizeLg="4" key={key} >
        <Probe token={token} id={key + 1} />
      </IonCol>
    );
  });

  return (
    <IonContent>

      <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)} showCancelButton="focus" animated></IonSearchbar>
      {!loading ? (
        <>
          <IonGrid>
            <IonRow>{probeCards}</IonRow>
          </IonGrid>
        </>
      ) : (
          <>
            <IonSkeletonText
              animated
              style={{ height: "20vh" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated
              style={{ height: "10vh" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated
              style={{ height: "30vh" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated
              style={{ height: "5vh" }}
            ></IonSkeletonText>
          </>
        )}
    </IonContent>
  );
};

export default ProbeList;
