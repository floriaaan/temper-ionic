import React from "react";
import { Box, Skeleton, Heading, Text, Stack, Badge } from "@chakra-ui/core";
import { retrieveProbe } from "../../assets/api.js";
import "./Probe.scss";

export class Probe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "CPU de Turing",
      user: 1,
      lastmeasure: {},
      state: false,
      loading: true,
    };
  }
  componentDidMount() {
    retrieveProbe(this);
  }

  render() {
    return (
      <Box w="lg" borderColor="gray.100" borderWidth="1px" p={4} rounded="lg">
        <Skeleton isLoaded={!this.state.loading}>
          <Heading>{this.state.name}</Heading>
          <Stack isInline>
            <Badge variantColor={this.state.state ? "green" : "red"}>
              {this.state.state ? "Activée" : "Désactivée"}
            </Badge>
          </Stack>
          <Text fontSize="md">
            {this.state.lastmeasure.temp}°C -{" "}
            {this.state.lastmeasure.humid}%
          </Text>
        </Skeleton>
      </Box>
    );
  }
}
