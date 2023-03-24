import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { addProject } from '../../api_methods/post_methods/postmethod';
import DatePicker from 'react-native-modern-datepicker';

const EditProject = ({data, id, headers, handleCloseAddProjectModal}) => {
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
                <Text style={styles.text}>Project Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Project Name' placeholderTextColor={"black"}
                    value={editproject.name} onChangeText={(text) => handleChange(text, 'name')} />
                <Text style={styles.text}>Project Start Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgreen" }} selected={editproject.startAt} mode="calendar" onDateChange={(text) => handleChange(text, 'startAt')} />
                <Text style={styles.text}>Project End Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgreen" }} selected={editproject.endAt} mode="calendar" onDateChange={(text) => handleChange(text, 'endAt')} />
                <Text style={styles.text}>Client Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Client Name' placeholderTextColor={"black"}
                   value={editproject.clientName}  onChangeText={(text) => handleChange(text, 'clientName')} />
                <Text style={styles.text}>Client's Contact No: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Client Contact No.' keyboardType='numeric' placeholderTextColor={"black"}
                    value={editproject.clientPhoneNumber} onChangeText={(text) => handleChange(text, 'clientPhoneNumber')} />
                <Text style={styles.text}>Client's Email Address: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Client Email Address' keyboardType="email-address" placeholderTextColor={"black"}
                   value={editproject.clientEmail} onChangeText={(text) => handleChange(text, 'clientEmail')} />
                <Button title='Add Project' onPress={AddProject} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 15,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },
    modalHeading: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    },
    textbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },
    select: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black"
    }
})

export default EditProject;