import React from "react";
import { Probe } from "./Probe";
// eslint-disable-next-line
import { ProbeAdd } from "./ProbeAdd";
import { Divider, Flex } from "@chakra-ui/core";
import { retrieveUserProbes } from "../../assets/api.js";

export class ProbeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      probes: [],
    };
    
  }

  componentDidMount() {
    retrieveUserProbes(this)
  }

  render() {
    
    return (
      <Flex direction="column">
      {this.state.probes.map((id, key) => {
        return (
          <React.Fragment key={key}>
          <Probe id={id} />
          <Divider mt={4} />
          </React.Fragment>
        )
      })}
      <ProbeAdd user="1" />
      </Flex>
    );
  }
}
