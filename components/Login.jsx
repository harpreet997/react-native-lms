import { useState } from "react";
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { login } from "../api_methods/post_methods/postmethod";
import styles from "../globalstyles/GlobalStyles";

const Login = (props) => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (text, input) => {
    setLoginData({
      ...logindata,
      [input]: text
    })
  }

  const handlePress = () => {
    if (logindata.email === "") {
      Alert.alert("Please enter email address");
    }
    else if (logindata.password === "") {
      Alert.alert("Please enter the password");
    }
    else {
      login(logindata)
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
      <View style={styles.loginMain}>
        <Text style={styles.text}>Email Address: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
          onChangeText={(text) => handleChange(text, 'email')} />
        <Text style={styles.text}>Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Password' placeholderTextColor={"black"}
          secureTextEntry={true} onChangeText={(text) => handleChange(text, 'password')} />
        <TouchableOpacity style={styles.login} onPress={handlePress}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



export default Login