

import { createDrawerNavigator } from '@react-navigation/drawer';
import ApplyLeave from '../user/leaves/ApplyLeave';
import CustomSidebar from '../sidebar/CustomSidebar';
import UserProfile from '../user/userprofile/UserProfile';
import Leaves from '../user/leaves/Leaves';

const Drawer = createDrawerNavigator();

const UserDashboard = (props) => {
    const { token } = props.route.params;
    let headers = {
        authorization: token
    }

    console.log(headers)
    
    return (
        <Drawer.Navigator screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }} 
          drawerContent={props => <CustomSidebar {...props}/>}>
            <Drawer.Screen name="User Profile" component={UserProfile} />
            <Drawer.Screen name="Apply Leave" component={ApplyLeave} />
            <Drawer.Screen name="Leaves" component={Leaves} />
        </Drawer.Navigator>
    );
}

export default UserDashboard
