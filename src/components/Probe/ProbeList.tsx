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
      await fetch("http://localhost:8000/api/v1/probe/user/" + user)
        .then((res) => res.json())
        .then((res) => {
          setList(res.response.data);
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <IonContent>
      {!loading ? (
        <>
          <IonGrid>
            <IonRow>
              <IonCol size-md="4">
                <Probe id={list[0]}></Probe>
              </IonCol>
              <IonCol size-md="4">
                <Probe id={list[1]}></Probe>
              </IonCol>
              <IonCol size-md="4">
                <Probe id={list[2]}></Probe>
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      ) : (
        <>
          <IonSkeletonText
            animated
            style={{ heigth: "100px" }}
          ></IonSkeletonText>
        </>
      )}
    </IonContent>
  );
};

export default ProbeList;
