import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Dashboard(props) {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Leave Management System</Text>
      <TouchableOpacity style={styles.login} onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signup} onPress={() => props.navigation.navigate("Signup")}>
        <Text style={styles.signuptext}>Signup</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "coral"
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        marginVertical: "50%"
    },
    login: {
        backgroundColor: 'lightgreen',
        borderRadius: 100, 
        width: 200,
        alignItems: "center",
        paddingVertical: 10
    },
    signup: {
        backgroundColor: 'lightgreen',
        borderRadius: 100, 
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 20
    },
    logintext: {
        fontSize: 18,
        fontWeight: "bold"
    },
    signuptext: {
        fontSize: 18,
        fontWeight: "bold"
    }
})