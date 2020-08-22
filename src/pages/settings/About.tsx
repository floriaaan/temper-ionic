import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonSkeletonText,
  IonButton,
  IonRow,
  IonCol,
} from "@ionic/react";
import Header from "../../components/Layout/Header";
import { Avatar, Heading, Divider, AvatarGroup, Box, Image, Badge, Text, Button } from "@chakra-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import temperLogo from '../../theme/temper.svg';

import { contributorsJSON, developpersJSON } from "../../contributors";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faTwitter);

interface GithubResponse {
  name: string;
  full_name: string;
  description: string;
  language: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  license: {
    name: string;
    spdx_id: string;
  } | null;
  html_url: string;
}

const About: React.FC = () => {
  const [github, setGHResponse] = useState<GithubResponse>();
  const [github_temperapi, setGHResponse_temperapi] = useState<GithubResponse>();
  const [state, setState] = useState({
    loading: true,
  })

  const contributors = contributorsJSON.map((obj, key) => {
    return (<Avatar
      name={obj.name}
      src={obj.img}
      onClick={() => {
        if (obj.link) window.open(obj.link, "_blank");
      }}
      style={{ cursor: obj.link ? 'pointer' : '' }}
      key={key}
    />)
  });

  const developpers = developpersJSON.map((obj, key) => {
    return (
      <IonItemSliding key={key}>
        <IonItem>
          <Avatar
            slot="start"
            size="xl"
            name={obj.name}
            src={obj.img}
          ></Avatar>
          <IonLabel>
            <Heading>{obj.head}</Heading>
            <p>{obj.desc}</p>
          </IonLabel>
          {obj.link.twitter !== '' ?
            <IonLabel slot="end" style={{ align: 'right' }}>
              <FontAwesomeIcon icon={['fab', 'twitter']} color="var(--ion-color-twitter)" onClick={() => {
                window.open(obj.link.twitter, "_blank");
              }} style={{ cursor: 'pointer' }} />
            </IonLabel>
            : ''}
        </IonItem>
        <IonItemOptions side="start">
          {obj.link.github !== '' ?
            <IonItemOption
              onClick={() => {
                window.open(obj.link.github, "_blank");
              }}
            >
              <FontAwesomeIcon icon={['fab', 'github']}></FontAwesomeIcon>
              <div className="" style={{ textTransform: "none" }}>
                &nbsp;Github Profile
          </div>
            </IonItemOption> : ''}
        </IonItemOptions>
      </IonItemSliding>
    )
  });



  useEffect(() => {

    fetch('https://api.github.com/repositories/261502861')
      .then((res) => res.json())
      .then((body) => {
        setGHResponse(body);
        setState({ ...state, loading: false })
      });
    fetch('https://api.github.com/repositories/277316664')
      .then((res) => res.json())
      .then((body) => {
        setGHResponse_temperapi(body);
        setState({ ...state, loading: false })
      });


  }, [])

  return (
    <IonPage>
      <IonContent>
        <Header title="About 🧑" version={2.1}></Header>

        {!state.loading ? <>
          <IonRow className="mx-auto">
            <IonCol size="8">
              <Box borderWidth="1px" rounded="lg" overflow="hidden">
                <Image src={temperLogo} className="m-2 mx-auto" w="30%" h="auto" alt="Temper"></Image>
                <Box p="6">
                  <Box d="flex" className="mb-1" alignItems="baseline">
                    <Heading as="h2" textTransform="capitalize" style={{ fontFamily: 'Nunito' }}>{github?.name}</Heading>
                    <Text color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      ml="2">{github?.full_name}</Text>

                  </Box>

                  <Box d="flex" alignItems="baseline">
                    <Badge rounded="full" px="2" variantColor="teal" style={{ textTransform: 'initial' }}>{github?.language}</Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      <FontAwesomeIcon icon={faStar} /> {github?.stargazers_count} stars &bull;&nbsp; <FontAwesomeIcon icon={faCodeBranch} /> {github?.forks_count} forks
                  </Box>
                    <Button fill="outline" size="xs" className="mt-2 mr-auto" slot="end" onClick={() => { window.open(github?.html_url, "_blank"); }}>
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </Button>
                  </Box>
                  <Divider className="my-1"></Divider>
                  <Text color="gray.500"
                    fontSize="xs"
                    ml="1">{github?.description}</Text>
                </Box>
              </Box>
            </IonCol>
            <IonCol size="4">
              <IonRow>
                <Box borderWidth="1px" rounded="lg" overflow="hidden">
                  <Image src={temperLogo} className="m-2 mx-auto" w="20%" h="auto" alt="Temper"></Image>
                  <Box p="6">
                    <Box d="flex" className="mb-1" alignItems="baseline">
                      <Text color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        ml="2">{github_temperapi?.full_name}</Text>

                    </Box>

                    <Box d="flex" alignItems="baseline">
                      <Badge rounded="full" px="2" variantColor="teal" style={{ textTransform: 'initial' }}>{github_temperapi?.language}</Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        <FontAwesomeIcon icon={faStar} /> {github_temperapi?.stargazers_count} stars &bull;&nbsp; <FontAwesomeIcon icon={faCodeBranch} /> {github_temperapi?.forks_count} forks
                  </Box>
                      <Button fill="outline" size="xs" className="mt-2 mr-auto" slot="end" onClick={() => { window.open(github_temperapi?.html_url, "_blank"); }}>
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </Button>
                    </Box>
                    <Divider className="my-1"></Divider>
                    <Text color="gray.500"
                      fontSize="xs"
                      ml="1">{github_temperapi?.description}</Text>
                  </Box>
                </Box>
              </IonRow>
            </IonCol>

            </IonRow>
        </> :
          <IonSkeletonText></IonSkeletonText>}
        <div className="py-3 mx-4">
          <Heading size="lg">Developpers</Heading>
        </div>
        <IonList>
          {developpers}
        </IonList>

        <Divider></Divider>
        <div className="py-3 mx-4">
          <Heading size="lg">Contributors</Heading>
        </div>
        <AvatarGroup size="lg" className="mx-2" max={5}>
          {contributors}
        </AvatarGroup>

      </IonContent>
    </IonPage >
  );
};

export default About;
