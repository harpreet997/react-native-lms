import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { addProject } from '../../api_methods/post_methods/postmethod';
import DatePicker from 'react-native-modern-datepicker';
import styles from '../../globalstyles/GlobalStyles';
import Toast from 'react-native-toast-message';

export default function AddProject({ headers, handleCloseAddProjectModal }) {

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
        if (addproject.name === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Project Name",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addproject.startAt === '') {
            Toast.show({
                type: "error",
                text1: "Please Select Start Date",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addproject.endAt === '') {
            Toast.show({
                type: "error",
                text1: "Please Select End Date",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addproject.clientName === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Client Name",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addproject.clientPhoneNumber === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Client Contact Number",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addproject.clientEmail === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Client Email Address",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else {
            addProject(addproject, headers)
                .then((response) => {
                    Toast.show({
                        type: "success",
                        text1: response.data.message,
                        visibilityTime: 2000,
                        position: "top",
                    })
                    handleCloseAddProjectModal();
                })
                .catch((error) => {
                    Toast.show({
                        type: "error",
                        text1: error.response.data.message,
                        visibilityTime: 2000,
                        position: "top",
                    })
                })
        }
    }

    return (
        <ScrollView > 
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Add Project</Text>
                <Text style={styles.addprojecttext}>Project Name: </Text>
                <TextInput style={styles.addprojecttextbox} placeholder='Enter Project Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'name')} />
                <Text style={styles.addprojecttext}>Project Start Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgrey" }} mode="calendar" onDateChange={(text) => handleChange(text, 'startAt')} />
                <Text style={styles.addprojecttext}>Project End Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgrey" }} mode="calendar" onDateChange={(text) => handleChange(text, 'endAt')} />
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
            <Toast />
        </ScrollView>
    )
}
