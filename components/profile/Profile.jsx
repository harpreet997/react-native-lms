import { View, Image, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function Profile(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../images/Profile.png')} />
      <Button title="logout" onPress={() => props.navigation.navigate("Dashboard")}/>
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
  }
})