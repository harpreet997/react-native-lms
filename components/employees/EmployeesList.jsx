import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, Modal, TouchableOpacity, Button, ActivityIndicator, ImageBackground } from "react-native";
import { getEmployees, getEmployeeDetail } from '../../api_methods/get_methods/getmethods'
import { deleteEmployee } from "../../api_methods/post_methods/postmethod";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";
import styles from "../../globalstyles/GlobalStyles";
import Toast from 'react-native-toast-message';

const EmployeesList = ({ headers }) => {
    const [employeelist, setEmployeeList] = useState([]);
    const [editemployee, setEditEmployee] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [projectname, setProjectName] = useState('')
    const [projectid, setProjectId] = useState('')
    const [addemployee, setAddEmployee] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEmployees(headers)
            .then((response) => {
                setEmployeeList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [employeelist, editemployee, modalVisible, addemployee]);


    const EditEmployeeModal = (id) => {
        const timer = setTimeout(() => {
            setModalVisible(true)
            setEditEmployee(id)
        }, 1000)
        return () => clearTimeout(timer);

    };

    const AddEmployeeModal = () => {
        setAddEmployee(true)
    };

    const ViewEmployee = (id) => {
        getEmployeeDetail(id, headers)
            .then((response) => {
                if (response.data.data.assignedProject === null) {
                    setProjectName("Bench");
                }
                else {
                    console.log(response.data.data.assignedProject[0].name)
                    setProjectName(response.data.data.assignedProject[0].name)
                    setProjectId(response.data.data.assignedProject[0]._id)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const DeleteEmployee = (id) => {
        deleteEmployee(id, headers)
            .then((response) => {
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                    visibilityTime: 2000,
                    position: "top",
                  })
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

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleCloseAddModal = () => {
        setAddEmployee(false);
    }

    const Item = ({ item, index }) => (
        <View key={index} style={[styles.employeesListItems,
        (index % 2 === 0) ? styles.primaryBackground : styles.secondaryBackground]}>
            <View style={styles.employeesListHeading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.employeesListHeading}>
                <Text style={styles.listbody}>{item.email}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <TouchableOpacity style={styles.edit} onPress={() => {
                ViewEmployee(item._id);
                EditEmployeeModal(item._id);
            }}>
                <Text style={styles.edittext}>Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={() => DeleteEmployee(item._id)} >
                <Text style={styles.deletetext}>Delete </Text>
            </TouchableOpacity>
            <Modal
                style={{ backgroundColor: "lightblue" }}
                animationType="slide"
                transparent={true}
                visible={editemployee === item._id ? modalVisible : false}
                onRequestClose={() => {
                    setTimeout(() => {
                        setEditEmployee(false);
                    }, 1000)

                }}>
                <EditEmployee data={item} id={item._id} project={projectname} projectid={projectid} headers={headers}
                    handleCloseModal={handleCloseModal} />
            </Modal>
        </View>
    );


    return (
        <>
            <Button title="Add Employee" onPress={AddEmployeeModal} />
            <Modal
                style={{ backgroundColor: "lightblue" }}
                animationType="slide"
                transparent={true}
                visible={addemployee}
                onRequestClose={() => {
                    setTimeout(() => {
                        setAddEmployee(false);
                    }, 1000)

                }}>
                <AddEmployee headers={headers} handleCloseAddModal={handleCloseAddModal} />
            </Modal>

            <ScrollView horizontal={true}>
            <ImageBackground source={require('../../images/logo.jpg')} >
                {loading ?
                    <View style={styles.indicatorWrapper}>
                        <ActivityIndicator style={styles.indicator} size="large" />
                        <Text style={styles.indicatorText}>Loading ...</Text>
                    </View>
                    :
                    <View>
                        {employeelist.length > 0 ?
                            <View style={styles.listheadingContainer}>
                                <View style={styles.employeesListHeading}>
                                    <Text style={styles.textSize}>Employee Name</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.employeesListHeading}>
                                    <Text style={styles.textSize}>Email Address</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.employeesListHeadingAction}>
                                    <Text style={styles.textSize}>Action</Text>
                                </View>
                            </View>
                            : null}

                        {employeelist.length > 0 ?
                            <FlatList
                            style={{marginBottom: 30}}
                                data={employeelist}
                                renderItem={Item}
                                keyExtractor={item => item._id}
                            /> : <Image source={require('../../images/NoRecord.png')} />}

                    </View>}
                    </ImageBackground>
            </ScrollView>
        </>
    )
}

export default EmployeesList;