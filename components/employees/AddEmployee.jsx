import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getProjects } from '../../api_methods/get_methods/getmethods';
import { addEmployee } from '../../api_methods/post_methods/postmethod';
import { Picker } from '@react-native-picker/picker';
import styles from '../../globalstyles/GlobalStyles';
import Toast from 'react-native-toast-message';

export default function AddEmployee({ headers, handleCloseAddModal }) {

    const [addemployee, setAddEmployee] = useState({
        employeeName: "",
        email: "",
        assignedProject: "",
    })
 
    const [projectlist, setProjectList] = useState([]);

    const handleChange = (text, input) => {
        setAddEmployee({
            ...addemployee,
            [input]: text
        });
    }

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
        if (addemployee.employeeName === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Employee Name",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addemployee.email === '') {
            Toast.show({
                type: "error",
                text1: "Please Enter Email Address",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addemployee.assignedProject === '') {
            Toast.show({
                type: "error",
                text1: "Please Select Project Name",
                visibilityTime: 1000,
                position: "top",
            })
        }
        else if (addemployee.assignedProject === "Bench") {
            addemployee.assignedProject = null;
            addEmployee(addemployee, headers)
                .then((response) => {
                    Toast.show({
                        type: "success",
                        text1: response.data.message,
                        visibilityTime: 2000,
                        position: "bottom",
                      })
                    handleCloseAddModal();
                })
                .catch((error) => {
                    Toast.show({
                        type: "error",
                        text1: error.response.data.message,
                        visibilityTime: 1000,
                        position: "bottom",
                      })
                })
        }
        else {
            addEmployee(addemployee, headers)
                .then((response) => {
                    Toast.show({
                        type: "success",
                        text1: response.data.message,
                        visibilityTime: 2000,
                        position: "bottom",
                      })
                    handleCloseAddModal();
                })
                .catch((error) => {
                    Toast.show({
                        type: "error",
                        text1: error.response.data.message,
                        visibilityTime: 2000,
                        position: "bottom",
                      })
                })
        }
    }

    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Add Employee</Text>
                <Text style={styles.addEmployeeText}>Employee Name: </Text>
                <TextInput style={styles.addEmployeeTextbox} placeholder='Enter Employee Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'employeeName')} />
                <Text style={styles.addEmployeeText}>Email Address: </Text>
                <TextInput style={styles.addEmployeeTextbox} placeholder='Enter Email Address' keyboardType="email-address" placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'email')} />

                <Text style={styles.addEmployeeText}>Project Assigned: </Text>
                <Picker style={styles.selectProject} onValueChange={(text) => handleChange(text, 'assignedProject')}>
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
            <Toast />
        </ScrollView>
    )
}
