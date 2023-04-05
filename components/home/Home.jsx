import Leaves from '../leaves/Leaves';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../profile/Profile';
import ApplyLeave from '../leaves/ApplyLeave';
import EmployeesList from '../employees/EmployeesList';
import ProjectList from '../projects/ProjectList';
import CustomSidebar from '../sidebar/CustomSidebar';

const Drawer = createDrawerNavigator();

export const Home = (props) => {
    const { token } = props.route.params;

    let headers = {
        authorization: token
    }


    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'coral'
            }
        }}
            drawerContent={props => <CustomSidebar {...props} />}>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Apply Leave" component={ApplyLeave} />
            <Drawer.Screen name="Leaves" component={Leaves} />
            <Drawer.Screen name="Employees">{() => (
                <EmployeesList
                    headers={headers}
                />
            )}</Drawer.Screen>
            <Drawer.Screen name="Projects">{() => (
                <ProjectList
                    headers={headers}
                />
            )}</Drawer.Screen>
        </Drawer.Navigator>
    );
}
