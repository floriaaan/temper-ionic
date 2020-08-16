import React from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import Header from "../../components/Layout/Header";
import { Avatar, Heading, Divider, AvatarGroup } from "@chakra-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faGithub);

const About: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Header title="About 🧑" version={2.1}></Header>
        <div className="py-3 mx-4">
          <Heading size="lg">Developpers</Heading>
        </div>
        <IonList>
          <IonItemSliding>
            <IonItem>
              <Avatar
                slot="start"
                size="xl"
                name="Florian Leroux"
                src="https://avatars0.githubusercontent.com/u/10078837?s=460&u=3c5bb03510dda069aa9b69c2d345719a3f1a073a&v=4"
              ></Avatar>
              <IonLabel>
                <Heading>Floriaaan - Florian Leroux</Heading>
                <p>Full-stack developper</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="start">
              <IonItemOption
                onClick={() => {
                  window.open("https://github.com/floriaaan", "_blank");
                }}
              >
                <FontAwesomeIcon icon={["fab", "github"]}></FontAwesomeIcon>
                <div className="" style={{ textTransform: "none" }}>
                  &nbsp;Github Profile
                </div>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonList>

        <Divider></Divider>
        <div className="py-3 mx-4">
          <Heading size="lg">Contributors</Heading>
        </div>
        <AvatarGroup size="lg" className="mx-2" max={5}>
          <Avatar
            name="Florian Leroux"
            src="https://avatars0.githubusercontent.com/u/10078837?s=460&u=3c5bb03510dda069aa9b69c2d345719a3f1a073a&v=4"
          />
          <Avatar
            name="Ophélie Zeitel"
            src="https://avatars1.githubusercontent.com/u/56133800?s=400&u=ef6aa2e5035ba38f4c04c4c492a8c17c464a27b8&v=4"
          />
          <Avatar
            name="Croissant"
            src="https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          />
          <Avatar
            name="Baguette"
            src="https://images.unsplash.com/photo-1597079910443-60c43fc4f729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
          />
          <Avatar name="Coquillettes" />
          <Avatar name="Claquettes" />
          <Avatar name="Arbustre" />
        </AvatarGroup>
      </IonContent>
    </IonPage>
  );
};

export default About;
