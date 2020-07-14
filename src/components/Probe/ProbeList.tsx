import React, { useState, useEffect } from "react";
import "./ProbeList.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSkeletonText,
} from "@ionic/react";
import Probe from "./Probe";

interface ContainerProps {
  user: number;
}

const ProbeList: React.FC<ContainerProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "http://" + window.location.hostname + ":8000/api/v1/probe/user/" + user
      )
        .then((res) => res.json())
        .then((res) => {
          setList(res.response.data);
          setLoading(false);
        });
    }

    fetchData();
  }, [user]);

  let probeCards = list.map((id, key) => {
    return (
      <IonCol sizeLg="4" key={key}>
        <Probe id={id} />
      </IonCol>
    );
  });

  return (
    <IonContent>
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
          <IonSkeletonText
            animated
            style={{ height: "15vh" }}
          ></IonSkeletonText>
        </>
      )}
    </IonContent>
  );
};

export default ProbeList;
