import Probe from "../pages/tabs/Probe";
import MapC from "../pages/tabs/Map";
import User from "../pages/tabs/User";
import Home from "../pages/tabs/Home";

import ProbePage from "../pages/Probe";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";

import {
  fingerPrintOutline,
  keyOutline,
  personAddOutline,
  cloudyOutline,
  locationOutline,
  personCircleOutline,
  homeOutline,
} from "ionicons/icons";
import DevTools from "../pages/settings/DevTools";
import About from "../pages/settings/About";

export const tabs = [
  {
    path: "/home",
    component: Home,
    icon: homeOutline,
    label: "Home",
  },
  {
    path: "/weather",
    component: Probe,
    icon: cloudyOutline,
    label: "Weather",
  },
  {
    path: "/map",
    component: MapC,
    icon: locationOutline,
    label: "Map",
  },
  {
    path: "/user",
    component: User,
    icon: personCircleOutline,
    label: "User",
  },
];

export const routes = [
  ...tabs,
  {
    path: "/probe/:id",
    component: ProbePage,
  },
  {
    path: "/dev",
    component: DevTools,
  },
  {
    path: "/about",
    component: About,
  },
];

export const auth = [
  {
    path: "/register",
    component: Register,
    icon: personAddOutline,
    label: "Register",
  },
  {
    path: "/login",
    component: Login,
    icon: fingerPrintOutline,
    label: "Login",
  },
  {
    path: "/forgot",
    component: Forgot,
    icon: keyOutline,
    label: "Forgot my password",
  },
];

export const defaultRoute = "/home";
