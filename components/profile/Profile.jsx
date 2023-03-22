import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function Profile(props) {

  const handleLogout = () => {
    props.navigation.navigate("Dashboard")
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../images/Profile.png')} />
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logouttext}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    marginVertical: 10,
    width: 300, 
    height: 300   
  }, 
  logout: {
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
    width: 200,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: "15%"
  },
  logouttext: {
    fontSize: 18,
    fontWeight: "bold"
  }
  
})