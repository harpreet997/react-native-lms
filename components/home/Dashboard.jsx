import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../../globalstyles/GlobalStyles';


export default function Dashboard(props) {
  return (
    <ScrollView>
    <View style={styles.main}>
      <Image style={styles.image} source={require('../../images/lms.jpg')} />
      <Text style={styles.startScreentext}>Leave Management System</Text>
      <TouchableOpacity style={styles.loginOption} onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupOption} onPress={() => props.navigation.navigate("Signup")}>
        <Text style={styles.signuptext}>Signup</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

