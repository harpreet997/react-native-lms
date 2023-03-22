import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getEmployees } from '../api_methods/get_methods/getmethods';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApprovedLeaves from './leaves/ApprovedLeaves';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './profile/Profile';
import ApplyLeave from './leaves/ApplyLeave';
import EmployeesList from './employees/EmployeesList';
import ProjectList from './projects/ProjectList';
import CustomSidebar from './sidebar/CustomSidebar';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export const Home = (props) => {
    const [employeelist, setEmployeeList] = useState([]);
    const { token } = props.route.params;

    let headers = {
        authorization: token
    }

    console.log(token)

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
        // <Tab.Navigator>
        //     <Tab.Screen name="All Leaves" component={AllLeaves} />
        //     <Tab.Screen name="Pending Leaves" component={PendingLeaves} />
        //     <Tab.Screen name="Approved Leaves" component={ApprovedLeaves} />
        // </Tab.Navigator>
        <Drawer.Navigator screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }} 
          drawerContent={props => <CustomSidebar {...props}/>}>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Apply Leave" component={ApplyLeave} />
            <Drawer.Screen name="All Leaves" component={ApprovedLeaves} />
            <Drawer.Screen name="Employees" component={() => <EmployeesList headers={headers}/>} />
            <Drawer.Screen name="Projects" component={() => <ProjectList headers={headers}/>} />
        </Drawer.Navigator>
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