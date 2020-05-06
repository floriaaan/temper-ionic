import React from "react";
import { Probe } from "./Probe";
import { retrieveUserProbes } from "../../assets/api.js";

export class ProbeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      probes: []
    };
    retrieveUserProbes(this);
  }

  render() {
    return (
    this.state.probes.map((id) => <Probe id={id} />)
    );
  }
}
