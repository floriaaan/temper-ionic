import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ColorModeProvider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input

} from "@chakra-ui/core";

import { store } from "../../assets/api.js";

export function ProbeAdd(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ name, setName ] = useState();
  
  
  return (
    <>
      <Button
        variant="ghost"
        variantColor="teal"
        leftIcon="add"
        onClick={onOpen}
      >
        Add a probe
      </Button>
      <ColorModeProvider value="light">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your probe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Probe's name</FormLabel>
              <Input type="text" id="name" aria-describedby="name-helper-text" value={name}
                onChange={event => setName(event.target.value)} />
              <FormHelperText id="name-helper-text">
                Helpful for knowing which probe is what <span role="img" aria-label="funny">😁</span>
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" variantColor="green" onClick={() => store(props)}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </ColorModeProvider>
    </>
  );
}
