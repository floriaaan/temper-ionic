import React from "react";
/*import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MdToday } from "react-icons/md";
import routes from "./components/Routes/";*/
import {
  ThemeProvider,
  ColorModeProvider,
  Flex,
  CSSReset,
} from "@chakra-ui/core";

/*import { Navigation } from "./components/Navigation/Navigation";
import { NavigationAction } from "./components/Navigation/NavigationAction";
import { About } from "./components/About/About";*/
import { ProbeList } from "./components/Probe/ProbeList";

import { temper } from "./themes/temper";
import "./App.scss";

function App() {
  return (
    <ThemeProvider theme={temper}>
      <CSSReset />
      <ColorModeProvider>
        <Flex justify="center">
          <ProbeList user="1" />
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;

/*
<Router>
          <Switch>
            <Route exact path={routes.home.pathname}>
              <Flex justify="center">
                <ProbeList user="1" />
              </Flex>
            </Route>
            <Route exact path={routes.aboutUs.pathname}>
              <About />
            </Route>
          </Switch>

          <Navigation>
            <NavigationAction to={routes.home.pathname} iconElement={MdToday}>
              Home
            </NavigationAction>
          </Navigation>
        </Router>
        */
