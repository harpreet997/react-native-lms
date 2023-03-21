import { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { login } from "../../api_methods/post_methods/postmethod";

const Signup = (props) => {
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
        <Text style={styles.text}>First Name: </Text>
        <TextInput style={styles.textbox} placeholder='Enter First Name' placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)} />
        <Text style={styles.text}>Last Name: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Last Name' placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)} />
        <Text style={styles.text}>Contact Number: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Contact Number' keyboardType="numeric" placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)} />
        <Text style={styles.text}>Email Address: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
          onChangeText={(text) => setEmail(text)} />
        <Text style={styles.text}>Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Password' placeholderTextColor={"black"}
          secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
        <Text style={styles.text}>Confirm Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Confirm Password' placeholderTextColor={"black"}
          secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

        <TouchableOpacity style={styles.login} onPress={handlePress}>
          <Text style={styles.logintext}>Register</Text>
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
    paddingBottom: 30
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingLeft: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
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
    marginHorizontal: "20%"
  },
  logintext: {
    fontSize: 18,
    fontWeight: "bold"
  }
})

export default Signup