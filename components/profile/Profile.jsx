import { View, Image, TouchableOpacity, Text } from 'react-native'
import styles from '../../globalstyles/GlobalStyles'
import Toast from 'react-native-toast-message';

const Profile = (props) => {
  const handleLogout = () => {
    Toast.show({
      type: "success",
      text1: "Logging out",
      visibilityTime: 1000,
      position: "top",
    })
    setTimeout(() => {
    props.navigation.navigate("Dashboard")
    },1000)
  }
  return (
    <View style={styles.profileContainer}>
      <Image style={styles.profileImage} source={require('../../images/Profile.png')} />
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logouttext}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Profile