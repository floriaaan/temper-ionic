import ProbeTab from "../pages/ProbeTab";
import MapTab from "../pages/MapTab";
import UserTab from "../pages/UserTab";
import ProbePage from "../pages/ProbePage";

import { thermometerOutline, mapOutline, peopleOutline, fingerPrintOutline, keyOutline, personAddOutline } from "ionicons/icons";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";

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