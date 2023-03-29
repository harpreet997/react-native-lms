import { View, Image, TouchableOpacity, Text } from 'react-native'
import styles from '../../../globalstyles/GlobalStyles'

const UserProfile = (props) => {
  const handleLogout = () => {
    props.navigation.navigate("Dashboard")
  }
  return (
    <View style={styles.profileContainer}>
      <Image style={styles.profileImage} source={require('../../../images/userprofile.png')} />
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logouttext}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default UserProfile