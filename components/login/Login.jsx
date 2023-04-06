import { useState } from "react";
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, ImageBackground} from "react-native";
import { login } from "../../api_methods/post_methods/postmethod";
import styles from "../../globalstyles/GlobalStyles";
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: "error",
        text1: "Please enter email address",
        visibilityTime: 1000,
        position: "top",
      })
    }
    else if (logindata.password === "") {
      Toast.show({
        type: "error",
        text1: "Please enter password",
        visibilityTime: 1000,
        position: "top",
      })
    }
    else {
      login(logindata)
        .then((response) => {
          if (response.data.data.role === "Admin") {
            Toast.show({
              type: "success",
              text1: response.data.message,
              visibilityTime: 1000,
              position: "top",
            })
            setTimeout(() => {
              props.navigation.navigate("Home", { token: response.data.token })
            }, 1000);
          }
          else {
            Alert.alert(response.data.message)
            setTimeout(() => {
              props.navigation.navigate("UserDashboard", { token: response.data.token })
            }, 2000)
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: error.response.data.message,
            visibilityTime: 1000,
            position: "top",
          })
        })
    }
  }

  return (
    <ImageBackground style={styles.container} source={require('../../images/logo.jpg')} >
    <ScrollView>
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
    </ImageBackground>
  );
}



export default Login