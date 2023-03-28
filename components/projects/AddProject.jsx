import { View, Text, TextInput, ScrollView, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { addProject } from '../../api_methods/post_methods/postmethod';
import DatePicker from 'react-native-modern-datepicker';
import styles from '../../globalstyles/GlobalStyles';

export default function AddProject({headers, handleCloseAddProjectModal}) {

    const [addproject, setAddProject] = useState({
        name: "",
        startAt: "",
        endAt: "",
        clientName: "",
        clientPhoneNumber: "",
        clientEmail: ""
    })

    const handleChange = (text, input) => {
        setAddProject({
            ...addproject,
            [input]: text
        });
    };

    const AddProject = () => {
        addProject(addproject, headers)
            .then((response) => {
                Alert.alert(response.data.message);
                handleCloseAddProjectModal();
            })
            .catch((error) => {
                Alert.alert(error.response.data.message);
            })
    }

    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Add Project</Text>
                <Text style={styles.addprojecttext}>Project Name: </Text>
                <TextInput style={styles.addprojecttextbox} placeholder='Enter Project Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'name')} />
                <Text style={styles.addprojecttext}>Project Start Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgreen" }} mode="calendar" onDateChange={(text) => handleChange(text, 'startAt')} />
                <Text style={styles.addprojecttext}>Project End Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgreen" }} mode="calendar" onDateChange={(text) => handleChange(text, 'endAt')} />
                <Text style={styles.addprojecttext}>Client Name: </Text>
                <TextInput style={styles.addprojecttextbox} placeholder='Enter Client Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'clientName')} />
                <Text style={styles.addprojecttext}>Client's Contact No: </Text>
                <TextInput style={styles.addprojecttextbox} placeholder='Enter Client Contact No.' keyboardType='numeric' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'clientPhoneNumber')} />
                <Text style={styles.addprojecttext}>Client's Email Address: </Text>
                <TextInput style={styles.addprojecttextbox} placeholder='Enter Client Email Address' keyboardType="email-address" placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'clientEmail')} />
                <Button title='Add Project' onPress={AddProject} />
            </View>
        </ScrollView>
    )
}
