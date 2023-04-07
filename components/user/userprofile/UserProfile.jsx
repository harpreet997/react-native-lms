import { View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native'
import styles from '../../../globalstyles/GlobalStyles'

const UserProfile = (props) => {
  const handleLogout = () => {
    props.navigation.navigate("Dashboard")
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