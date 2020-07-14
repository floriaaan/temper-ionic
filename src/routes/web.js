import ProbeTab from "../pages/ProbeTab";
import MapTab from "../pages/MapTab";
import UserTab from "../pages/UserTab";
import ProbePage from "../pages/ProbePage";

import { thermometerOutline, mapOutline, peopleOutline } from "ionicons/icons";

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
}]