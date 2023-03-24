import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, FlatList, Alert, Modal, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { getEmployees, getEmployeeDetail } from '../../api_methods/get_methods/getmethods'
import { deleteEmployee } from "../../api_methods/post_methods/postmethod";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";


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
                Alert.alert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleCloseAddModal = () => {
        setAddEmployee(false);
    }

    const Item = ({ item, index }) => (
        <View key={index} style={[{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black', margin: 3 }, (index % 2 === 0) ? { backgroundColor: "coral" } : { backgroundColor: "yellow" }]}>
            <View style={styles.listheading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
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
                        setAddEmployee(false);
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
                {loading ?
                    <View style={styles.indicatorWrapper}>
                        <ActivityIndicator style={styles.indicator} size="large" />
                        <Text style={styles.indicatorText}>Loading ...</Text>
                    </View>
                    :
                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black', margin: 3 }}>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Employee Name</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Email Address</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheadingAction}>
                                <Text style={styles.textSize}>Action</Text>
                            </View>
                        </View>
                        <FlatList
                            data={employeelist}
                            renderItem={Item}
                            keyExtractor={item => item.i}
                        />

                    </View>}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2
    },
    textSize: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
        color: "black"
    },

    listheading: {
        width: "35%",
        justifyContent: "center"

    },
    listheadingAction: {
        width: "30%",
        justifyContent: "center"
    },
    listbody: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        color: 'black'
    },
    verticalline: {
        justifyContent: "center"
    },
    textCaptital: {
        textTransform: 'capitalize',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    text: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    edit: {
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        width: "12%",
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },
    edittext: {
        fontSize: 15,
        fontWeight: "bold"
    },
    delete: {
        backgroundColor: 'green',
        borderRadius: 5,
        width: "12%",
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },
    deletetext: {
        fontSize: 15,
        fontWeight: "bold"
    },
    indicator: {
        alignItems: "center",
        marginHorizontal: 150
    },
    indicatorWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorText: {
        fontSize: 18,
    }
})

export default EmployeesList;