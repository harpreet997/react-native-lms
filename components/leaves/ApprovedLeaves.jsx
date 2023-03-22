import React from "react";
import PendingLeaves from "./PendingLeaves";
import AllLeaves from "./AllLeaves";
import RejectedLeaves from "./RejectedLeaves";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ApprovedLeaves = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All Leaves" component={AllLeaves} />
            <Tab.Screen name="Pending Leaves" component={PendingLeaves} />
            <Tab.Screen name="Rejected Leaves" component={RejectedLeaves} />
        </Tab.Navigator>
    )
}

export default ApprovedLeaves;