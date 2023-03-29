import { useState, useEffect } from 'react';
import { getEmployees } from '../../api_methods/get_methods/getmethods';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Leaves from '../leaves/Leaves';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../profile/Profile';
import ApplyLeave from '../leaves/ApplyLeave';
import EmployeesList from '../employees/EmployeesList';
import ProjectList from '../projects/ProjectList';
import CustomSidebar from '../sidebar/CustomSidebar';
// import DailyStatus from './status/DailyStatus';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

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
        <Drawer.Navigator screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }} 
          drawerContent={props => <CustomSidebar {...props}/>}>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Apply Leave" component={ApplyLeave} />
            <Drawer.Screen name="All Leaves" component={Leaves} />
            <Drawer.Screen name="Employees" component={() => <EmployeesList headers={headers}/>} />
            <Drawer.Screen name="Projects" component={() => <ProjectList headers={headers}/>} />
            {/* <Drawer.Screen name="Daily Status" component={DailyStatus} /> */}
        </Drawer.Navigator>
    );
}
