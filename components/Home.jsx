import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getEmployees } from '../api_methods/get_methods/getmethods';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllLeaves from './leaves/AllLeaves';
import PendingLeaves from './leaves/PendingLeaves';
import ApprovedLeaves from './leaves/ApprovedLeaves';


const Tab = createMaterialTopTabNavigator();

export const Home = (props) => {
    const [employeelist, setEmployeeList] = useState([]);
    const { token } = props.route.params;

    let headers = {
        authorization: token
    }

    useEffect(() => {
        getEmployees(headers)
            .then((response) => {
                setEmployeeList(response.data.data);
            })
            .catch((error) => {
                console.log("error", error);
            })
    }, []);

    return (
            <Tab.Navigator>
                <Tab.Screen name="All Leaves" component={AllLeaves} />
                <Tab.Screen name="Pending Leaves" component={PendingLeaves} />
                <Tab.Screen name="Approved Leaves" component={ApprovedLeaves} />
            </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: 'lightgreen'
    },
    textSize: {
        fontSize: 20
    }
})