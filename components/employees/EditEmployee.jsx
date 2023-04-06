import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { editEmployee } from '../../api_methods/post_methods/postmethod';
import { getProjects } from '../../api_methods/get_methods/getmethods';
import styles from '../../globalstyles/GlobalStyles';
import Toast from 'react-native-toast-message';

const EditEmployee = ({ data, id, project, projectid, headers, handleCloseModal }) => {
    const [editemployee, setEditEmployee] = useState({
        name: data.name,
        email: data.email,
    })
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


    const handleChange = (text, input) => {
        setEditEmployee({
            ...editemployee,
            [input]: text
        });
    };

    const UpdateEmployee = () => {
        if (projectId === "Bench") {
            const data = {
                name: editemployee.name,
                email: editemployee.name,
                assignedProject: null
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    Toast.show({
                        type: "success",
                        text1: response.data.message,
                        visibilityTime: 2000,
                        position: "top",
                      });
                    handleCloseModal();
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
        else if (projectName === "Bench") {
            const data = {
                name: editemployee.name,
                email: editemployee.name,
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
                name: editemployee.name,
                email: editemployee.email,
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
                <TextInput style={styles.editEmployeeTextbox} value={editemployee.name} onChangeText={(text) => handleChange(text, 'name')}
                    placeholder="Employee Name" />
                <Text style={styles.editEmployeeText}>Email Address: </Text>
                <TextInput style={styles.editEmployeeTextbox} value={editemployee.email} onChangeText={(text) => handleChange(text, 'email')}
                    keyboardType="email-address" placeholder="Email Address" />

                <Text style={styles.editEmployeeText}>Project Assigned: </Text>
                <Picker style={styles.selectProject} selectedValue={projectId} onValueChange={(itemValue) => {
                    setProjectId(itemValue);
                    setProjectName('')
                    }}>
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