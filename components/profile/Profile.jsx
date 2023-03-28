import { View, Image, TouchableOpacity, Text } from 'react-native'
import styles from '../../globalstyles/GlobalStyles'

const Profile = (props) => {
  const handleLogout = () => {
    props.navigation.navigate("Dashboard")
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