import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/core";

export class NavigationAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to: props.to,
      iconElement: props.iconElement,
      location: useLocation(),
    };
  }

  render() {
    return (
      <Flex
        as={Link}
        to={this.state.to}
        color={
          this.state.to === this.state.location.pathname ? "white" : "brand.200"
        }
        flexDir="column"
        align="center"
        flexGrow="1"
        flexBasis="100%"
        p="2"
        pt="3"
        {...this.props}
      >
        <Box as={this.state.IconElement} size="1.6rem" />
        <Text
          fontSize="0.55rem"
          fontWeight="bold"
          textTransform="uppercase"
          mt="1"
        >
          {[...this.children]}
        </Text>
      </Flex>
    );
  }
}
