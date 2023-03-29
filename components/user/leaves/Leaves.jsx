import React from "react";
import PendingLeaves from "./PendingLeaves";
import UserAllLeaves from "./UserAllLeaves";
import RejectedLeaves from "./RejectedLeaves";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Leaves = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All Leaves" component={UserAllLeaves} />
            <Tab.Screen name="Pending Leaves" component={PendingLeaves} />
            <Tab.Screen name="Rejected Leaves" component={RejectedLeaves} />
        </Tab.Navigator>
    )
}

export default Leaves;