import { ScrollView, View, Text, TextInput, TouchableOpacity, ImageBackground} from "react-native";
import styles from "../../globalstyles/GlobalStyles";

const Signup = () => {
  return (
    <ImageBackground style={styles.container} source={require('../../images/logo.jpg')} >
    <ScrollView>
      <View style={styles.signupMain}>
        <Text style={styles.text}>First Name: </Text>
        <TextInput style={styles.textbox} placeholder='Enter First Name' placeholderTextColor={"black"}
        />
        <Text style={styles.text}>Last Name: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Last Name' placeholderTextColor={"black"}
        />
        <Text style={styles.text}>Contact Number: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Contact Number' keyboardType="numeric" placeholderTextColor={"black"}
        />
        <Text style={styles.text}>Email Address: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
        />
        <Text style={styles.text}>Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Password' placeholderTextColor={"black"}
          secureTextEntry={true}/>
        <Text style={styles.text}>Confirm Password: </Text>
        <TextInput style={styles.textbox} placeholder='Enter Confirm Password' placeholderTextColor={"black"}
          secureTextEntry={true}  />
        <TouchableOpacity style={styles.register} >
          <Text style={styles.signuptext}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

export default Signup