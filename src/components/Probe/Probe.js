import React from "react";
import { Box, Skeleton, Heading, Text, Stack, Badge } from "@chakra-ui/core";
import { retrieveProbe } from "../../assets/api.js";
import "./Probe.scss";

export class Probe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      state: false,
      lastmeasure: {},
      gps: {},
      loading: true,
    };
  }
  componentDidMount() {
    retrieveProbe(this);
  }

  render() {
    return (
      <Box w="lg" borderWidth="10px" p={4}>
        <Skeleton isLoaded={!this.state.loading}>
          <Heading>{this.state.name}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!this.state.loading}>
          <Stack isInline>
            <Badge variantColor={this.state.state ? "green" : "red"}>
              {this.state.state ? "Active" : "Disabled"}
            </Badge>
          </Stack>
        </Skeleton>
        <Skeleton isLoaded={!this.state.loading}>
          <Text fontSize="md">
            {this.state.lastmeasure.temperature !== 0
              ? this.state.lastmeasure.temperature + "°C"
              : "❌"}{" "}
            -{" "}
            {this.state.lastmeasure.humidity !== 0
              ? this.state.lastmeasure.humidity + "%"
              : "❌"}{" "}
            {this.state.lastmeasure.date !== 'None'
              ? "at " + this.state.lastmeasure.date
              : "at ❌"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!this.state.loading}>
          {this.state.gps.lon && this.state.gps.lat ? (
            <Text fontSize="xs">
              {this.state.gps.lon} - {this.state.gps.lat}
            </Text>
          ) : (
            <Text fontSize="xs">
              No location{" "}
              <span role="img" aria-label="No location">
                ❌
              </span>
            </Text>
          )}
        </Skeleton>
      </Box>
    );
  }
}
