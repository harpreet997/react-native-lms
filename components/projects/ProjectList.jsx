import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, FlatList, Button, Alert, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import { getProjects } from '../../api_methods/get_methods/getmethods'
import { deleteProject } from "../../api_methods/post_methods/postmethod";
import AddProject from "./AddProject";
import EditProject from "./EditProject";

const ProjectList = ({ headers }) => {
    const [projectlist, setProjectList] = useState([]);
    const [addproject, setAddProject] = useState(false);
    const [editproject, setEditProject] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [projectlist, addproject, editproject]);


    const AddProjectModal = () => {
        setAddProject(true)
    };

    const handleCloseAddProjectModal = () => {
        setAddProject(false);
    }

    const DeleteProject = (id) => {
        deleteProject(id, headers)
            .then((response) => {
                Alert.alert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleOpenModal = (id) => {
        setModalVisible(true)
        setEditProject(id)
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
                <Text style={styles.listbody}>{item.clientName}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.clientPhoneNumber}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.clientEmail}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>

            <TouchableOpacity style={styles.edit} onPress={() => handleOpenModal(item._id)}>
                <Text style={styles.edittext}>Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={() => DeleteProject(item._id)}>
                <Text style={styles.deletetext}>Delete </Text>
            </TouchableOpacity>

            <Modal
                style={{ backgroundColor: "lightblue" }}
                animationType="slide"
                transparent={true}
                visible={editproject === item._id ? modalVisible : false}
                onRequestClose={() => {
                    setTimeout(() => {
                        setModalVisible(!modalVisible);
                    }, 1000)

                }}>
                <EditProject data={item} id={item._id}/>
            </Modal>

        </View>
    );


    return (
        <>
            <Button title="Add Project" onPress={AddProjectModal} />

            <Modal
                style={{ backgroundColor: "lightblue" }}
                animationType="slide"
                transparent={true}
                visible={addproject}
                onRequestClose={() => {
                    setTimeout(() => {
                        setAddProject(false);
                    }, 1000)

                }}>
                <AddProject headers={headers} handleCloseAddProjectModal={handleCloseAddProjectModal} />
            </Modal>
            <ScrollView horizontal={true} style={{ width: "100%" }}>
            {loading ?
                    <View style={styles.indicatorWrapper}>
                        <ActivityIndicator style={styles.indicator} size="large" />
                        <Text style={styles.indicatorText}>Loading ...</Text>
                    </View>
                    :
                <View >
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black', margin: 3 }}>
                        <View style={styles.listheading}>
                            <Text style={styles.textSize}>Project Name</Text>
                        </View>
                        <View style={styles.verticalline}>
                            <Text >|</Text>
                        </View>
                        <View style={styles.listheading}>
                            <Text style={styles.textSize}>Client Name</Text>
                        </View>
                        <View style={styles.verticalline}>
                            <Text >|</Text>
                        </View>
                        <View style={styles.listheading}>
                            <Text style={styles.textSize}>Client's Contact No.</Text>
                        </View>
                        <View style={styles.verticalline}>
                            <Text >|</Text>
                        </View>
                        <View style={styles.listheading}>
                            <Text style={styles.textSize}>Client's Email Address</Text>
                        </View>
                        <View style={styles.verticalline}>
                            <Text >|</Text>
                        </View>

                        <View style={styles.listheadingAction}>
                            <Text style={styles.textSize}>Action</Text>
                        </View>
                    </View>
                    <FlatList
                        data={projectlist}
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
        width: "20%",
        justifyContent: "center"

    },
    listheadingAction: {
        width: 130,
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
        width: 55,
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
        width: 55,
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

export default ProjectList;