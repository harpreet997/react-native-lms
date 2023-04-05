import { View, Text, TextInput, ScrollView, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { editProject } from '../../api_methods/post_methods/postmethod';
import DatePicker from 'react-native-modern-datepicker';
import styles from '../../globalstyles/GlobalStyles';

const EditProject = ({data, id, headers, handleCloseEditProjectModal}) => {
    const [editproject, setEditProject] = useState({
        name: data.name,
        startAt: data.startAt.substring(0, 10),
        endAt: data.endAt.substring(0, 10),
        clientName: data.clientName,
        clientPhoneNumber: data.clientPhoneNumber,
        clientEmail: data.clientEmail
    })

    const handleChange = (text, input) => {
        setEditProject({
            ...editproject,
            [input]: text
        });
    };

    const UpdateProject = () => {
        editProject(id, editproject, headers)
        .then((response) => {
            Alert.alert(response.data.message)
            handleCloseEditProjectModal();
        })
        .catch((error) => {
            Alert.alert(error.response.data.message);
        })
    }


    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Edit Project</Text>
                <Text style={styles.editprojecttext}>Project Name: </Text>
                <TextInput style={styles.editprojecttextbox} placeholder='Enter Project Name' placeholderTextColor={"black"}
                    value={editproject.name} onChangeText={(text) => handleChange(text, 'name')} />
                <Text style={styles.editprojecttext}>Project Start Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgrey" }} selected={editproject.startAt} mode="calendar" onDateChange={(text) => handleChange(text, 'startAt')} />
                <Text style={styles.editprojecttext}>Project End Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgrey" }} selected={editproject.endAt} mode="calendar" onDateChange={(text) => handleChange(text, 'endAt')} />
                <Text style={styles.editprojecttext}>Client Name: </Text>
                <TextInput style={styles.editprojecttextbox} placeholder='Enter Client Name' placeholderTextColor={"black"}
                   value={editproject.clientName}  onChangeText={(text) => handleChange(text, 'clientName')} />
                <Text style={styles.editprojecttext}>Client's Contact No: </Text>
                <TextInput style={styles.editprojecttextbox} placeholder='Enter Client Contact No.' keyboardType='numeric' placeholderTextColor={"black"}
                    value={editproject.clientPhoneNumber} onChangeText={(text) => handleChange(text, 'clientPhoneNumber')} />
                <Text style={styles.editprojecttext}>Client's Email Address: </Text>
                <TextInput style={styles.editprojecttextbox} placeholder='Enter Client Email Address' keyboardType="email-address" placeholderTextColor={"black"}
                   value={editproject.clientEmail} onChangeText={(text) => handleChange(text, 'clientEmail')} />
                <Button title='Update Project' onPress={UpdateProject} />
            </View>
        </ScrollView>
    )
}

export default EditProject;