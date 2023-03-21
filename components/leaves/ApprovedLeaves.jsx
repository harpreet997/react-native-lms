import React from "react";
import { Text, View } from "react-native/";
import PendingLeaves from "./PendingLeaves";
import AllLeaves from "./AllLeaves";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ApprovedLeaves = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All Leaves" component={AllLeaves} />
            <Tab.Screen name="Pending Leaves" component={PendingLeaves} />
        </Tab.Navigator>
    )
}

export default ApprovedLeaves;