import React from "react";
import "./App.scss";
import { ThemeProvider, ColorModeProvider, Flex } from "@chakra-ui/core";
import { Probe } from "./components/Probe/Probe";
import { temper } from "./themes/temper"

function App() {
  return (
    <ThemeProvider theme={temper}>
      <ColorModeProvider>
        <Flex justify="center">
          <Probe />
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
