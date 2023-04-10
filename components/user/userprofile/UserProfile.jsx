import { View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native'
import styles from '../../../globalstyles/GlobalStyles'
import Toast from 'react-native-toast-message';

const UserProfile = (props) => {
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
    <ImageBackground style={styles.profileContainer} source={require('../../../images/logo.jpg')} >
    <View>
      <Image style={styles.profileImage} source={require('../../../images/userprofile.png')} />
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logouttext}>Logout</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

export default UserProfile