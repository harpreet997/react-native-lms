import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { editEmployee } from '../../api_methods/post_methods/postmethod';
import { getProjects } from '../../api_methods/get_methods/getmethods';

const EditEmployee = ({ data, id, project, projectid, headers, handleCloseModal }) => {
    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [projectlist, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState(project)
    const [projectId, setProjectId] = useState(projectid)

    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [projectId]);


    
    const UpdateEmployee = () => {
        if (projectId === "Bench") {
            const data = {
                name: name,
                email: email,
                assignedProject: null
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    Alert.alert(response.data.message)
                    handleCloseModal();
                })
                .catch((error) => {
                    Alert.alert(error.response.data.message);
                })
        }
        else if (projectName === "Bench") {
            const data = {
                name: name,
                email: email,
                assignedProject: null
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    Alert.alert(response.data.message)
                    handleCloseModal();
                })
                .catch((error) => {
                    Alert.alert(error.response.data.message);
                })
        }
        else {
            const data = {
                name: name,
                email: email,
                assignedProject: projectId
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    Alert.alert(response.data.message)
                    handleCloseModal();
                })
                .catch((error) => {
                    Alert.alert(error.response.data.message);
                })
        }
    }


    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Edit Employee</Text>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} value={name} onChangeText={(text) => setName(text)}
                    placeholder="Employee Name" />
                <Text style={styles.text}>Email Address: </Text>
                <TextInput style={styles.textbox} value={email} onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address" placeholder="Email Address" />

                <Text style={styles.text}>Project Assigned: </Text>
                <Picker style={styles.select} onValueChange={(itemValue) => setAssignedProject(itemValue)}>
                    <Picker.Item label="Bench" value="Bench" />
                    {projectlist.map((item, index) => {
                        return (
                        <Picker.Item key={index} label={item.name} value={item._id} />
                        )
                    })}
                </Picker>
                <Button title='Update' onPress={UpdateEmployee}/>
            </View>
        </ScrollView>
    );
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

export default EditEmployee;