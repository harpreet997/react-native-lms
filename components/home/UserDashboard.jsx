

import { createDrawerNavigator } from '@react-navigation/drawer';
import ApplyLeave from '../user/leaves/ApplyLeave';
import CustomSidebar from '../sidebar/CustomSidebar';
import UserProfile from '../user/userprofile/UserProfile';
import Leaves from '../user/leaves/Leaves';

const Drawer = createDrawerNavigator();

const UserDashboard = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#BD9DBF'
            }
          }} 
          drawerContent={props => <CustomSidebar {...props}/>}>
            <Drawer.Screen name="User Profile" component={UserProfile} />
            <Drawer.Screen name="Apply Leave" component={ApplyLeave} />
            <Drawer.Screen name="Leaves" component={Leaves} />
        </Drawer.Navigator>
    );
}

export default UserDashboard
