import ProbeTab from "../pages/tabs/ProbeTab";
import MapTab from "../pages/tabs/MapTab";
import UserTab from "../pages/tabs/UserTab";

import ProbePage from "../pages/ProbePage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";

import { thermometerOutline, mapOutline, peopleOutline, fingerPrintOutline, keyOutline, personAddOutline } from "ionicons/icons";


export const RoutesTab = [{
    path : '/probes',
    component: ProbeTab,
    icon: thermometerOutline,
    label: 'Probes'
},{
    path : '/map',
    component: MapTab,
    icon: mapOutline,
    label: 'Map'
},{
    path : '/user',
    component: UserTab,
    icon: peopleOutline,
    label: 'User'
}];

export const Routes = [...RoutesTab,{
    path : '/probe/:id',
    component: ProbePage
}];

export const RoutesAuth = [{
    path : '/register',
    component: Register,
    icon: personAddOutline,
    label: 'Register'
},{
    path : '/login',
    component: Login,
    icon: fingerPrintOutline,
    label: 'Login'
},{
    path : '/forgot',
    component: Forgot,
    icon: keyOutline,
    label: 'Forgot my password'
}];