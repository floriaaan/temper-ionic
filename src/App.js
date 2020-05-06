import React from "react";
import "./App.scss";
import { ThemeProvider, ColorModeProvider, Flex } from "@chakra-ui/core";
import { ProbeList } from "./components/Probe/ProbeList";
import { temper } from "./themes/temper"

function App() {
  return (
    <ThemeProvider theme={temper}>
      <ColorModeProvider>
        <Flex justify="center">
          <ProbeList user="1"/>
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
