import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getProjects } from '../../api_methods/get_methods/getmethods';
import { addEmployee } from '../../api_methods/post_methods/postmethod';
import { Picker } from '@react-native-picker/picker';

export default function AddEmployee({ headers, handleCloseAddModal }) {
    const [employeeName, setEmployeeName] = useState('')
    const [email, setEmail] = useState('')
    const [assignedProject, setAssignedProject] = useState('')
    const [projectlist, setProjectList] = useState([]);

    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const AddEmployee = () => {
        const payload = {
            employeeName: employeeName,
            email: email,
            assignedProject: assignedProject
        }
        if (assignedProject === "Bench") {
            assignedProject = null;
            addEmployee(payload, headers)
                .then((response) => {
                    Alert.alert(response.data.message)
                    handleCloseAddModal();
                })
                .catch((error) => {
                    Alert.alert(error.response.data.message);
                })
        }
        else {
            addEmployee(payload, headers)
                .then((response) => {
                    Alert.alert(response.data.message);
                    handleCloseAddModal();
                })
                .catch((error) => {
                    Alert.alert(error.response.data.message);
                })
        }
    }

    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Add Employee</Text>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Employee Name' placeholderTextColor={"black"}
                    onChangeText={(text) => setEmployeeName(text)} />
                <Text style={styles.text}>Email Address: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
                    onChangeText={(text) => setEmail(text)} />

                <Text style={styles.text}>Project Assigned: </Text>
                <Picker style={styles.select} onValueChange={(itemValue) => setAssignedProject(itemValue)}>
                    <Picker.Item label="Select Project" value="" />
                    <Picker.Item label="Bench" value="Bench" />
                    {projectlist.map((item, index) => {
                        return (
                            <Picker.Item key={index} label={item.name} value={item._id} />
                        )
                    })}
                </Picker>
                <Button title='Add Employee' onPress={AddEmployee} />
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