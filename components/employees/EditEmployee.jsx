import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { editEmployee } from '../../api_methods/post_methods/postmethod';
import { getProjects } from '../../api_methods/get_methods/getmethods';
import styles from '../../globalstyles/GlobalStyles';

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
                <Text style={styles.editEmployeeText}>Employee Name: </Text>
                <TextInput style={styles.editEmployeeTextbox} value={name} onChangeText={(text) => setName(text)}
                    placeholder="Employee Name" />
                <Text style={styles.editEmployeeText}>Email Address: </Text>
                <TextInput style={styles.editEmployeeTextbox} value={email} onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address" placeholder="Email Address" />

                <Text style={styles.editEmployeeText}>Project Assigned: </Text>
                <Picker style={styles.selectProject} onValueChange={(itemValue) => setAssignedProject(itemValue)}>
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

export default EditEmployee;