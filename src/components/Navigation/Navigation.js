import React from "react";
import { Flex } from "@chakra-ui/core";

export class Navigation extends React.Component {
  render() {
    return (
      <Flex
        as="nav"
        backgroundColor="brand.700"
        paddingBottom="env(safe-area-inset-bottom)"
      >
        {this.props.children}
      </Flex>
    );
  }
}
