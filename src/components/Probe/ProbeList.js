import React from "react";
import { Probe } from "./Probe";
// eslint-disable-next-line
import { ProbeAdd } from "./ProbeAdd";
import { Grid } from "@chakra-ui/core";
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
      <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {this.state.probes.map((id, key) => {
        return (
          <React.Fragment key={key}>
          <Probe id={id} />
          </React.Fragment>
        )
      })}
      
        <ProbeAdd user="1" />
      </Grid>
      </>
      
    );
  }
}
