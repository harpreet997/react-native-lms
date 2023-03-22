import { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { login } from "../api_methods/post_methods/postmethod";

export const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlePress = () => {
    if (email === undefined) {
      Alert.alert("Please enter email address");
    }
    else if (password === undefined) {
      Alert.alert("Please enter the password");
    }
    else {
      const payload = {
        email: email,
        password: password
      }
      login(payload)
        .then((response) => {
          Alert.alert(response.data.message)
          setTimeout(() => {
            props.navigation.navigate("Home", { token: response.data.token })
          }, 2000);

        })
        .catch((error) => {
          Alert.alert(error.response.data.message);
        })

    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>Email Address: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)} />
        <Text style={styles.text}>Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Password' placeholderTextColor={"black"}
          secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
        <TouchableOpacity style={styles.login} onPress={handlePress}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    paddingTop: 20,

  },
  main: {
    justifyContent: 'center',
    marginVertical: "30%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "black"
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingLeft: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    color: "black"
  },
  items: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'orange',
    marginBottom: 5,
    borderWidth: 1
  },
  button: {
    margin: 10,
    alignItems: 'center'
  },
  login: {
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
    width: 200,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: "15%"
  },
  logintext: {
    fontSize: 18,
    fontWeight: "bold"
  }
})