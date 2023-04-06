import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, Button, Alert, Modal, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from "react-native";
import { getProjects } from '../../api_methods/get_methods/getmethods'
import { deleteProject } from "../../api_methods/post_methods/postmethod";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import styles from "../../globalstyles/GlobalStyles";
import Toast from 'react-native-toast-message';

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


    const handleCloseEditProjectModal = () => {
        setEditProject(false);
    }

    const DeleteProject = (id) => {
        deleteProject(id, headers)
            .then((response) => {
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                    visibilityTime: 1000,
                    position: "top",
                  })
            })
            .catch((error) => {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message,
                    visibilityTime: 1000,
                    position: "top",
                  })
            })
    }

    const handleOpenModal = (id) => {
        setModalVisible(true)
        setEditProject(id)
    }



    const Item = ({ item, index }) => (
        <View key={index} style={[styles.projectlistItems,
        (index % 2 === 0) ? styles.primaryBackground : styles.secondaryBackground]}>
            <View style={styles.projectlistheading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientName}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientPhoneNumber}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientEmail}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>

            <TouchableOpacity style={styles.projectedit} onPress={() => handleOpenModal(item._id)}>
                <Text style={styles.edittext}>Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.projectdelete} onPress={() => DeleteProject(item._id)}>
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
                <EditProject data={item} id={item._id} headers={headers} handleCloseEditProjectModal={handleCloseEditProjectModal} />
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
            <ScrollView horizontal={true} >
                <ImageBackground source={require('../../images/logo.jpg')} >
                    {loading ?
                        <View style={styles.indicatorWrapper}>
                            <ActivityIndicator style={styles.indicator} size="large" />
                            <Text style={styles.indicatorText}>Loading ...</Text>
                        </View>
                        :
                        <View>
                            {projectlist.length > 0 ?
                                <View style={styles.listheadingContainer}>
                                    <View style={styles.projectlistheading}>
                                        <Text style={styles.textSize}>Project Name</Text>
                                    </View>
                                    <View style={styles.verticalline}>
                                        <Text >|</Text>
                                    </View>
                                    <View style={styles.projectlistheading}>
                                        <Text style={styles.textSize}>Client Name</Text>
                                    </View>
                                    <View style={styles.verticalline}>
                                        <Text >|</Text>
                                    </View>
                                    <View style={styles.projectlistheading}>
                                        <Text style={styles.textSize}>Client's Contact No.</Text>
                                    </View>
                                    <View style={styles.verticalline}>
                                        <Text >|</Text>
                                    </View>
                                    <View style={styles.projectlistheading}>
                                        <Text style={styles.textSize}>Client's Email Address</Text>
                                    </View>
                                    <View style={styles.verticalline}>
                                        <Text >|</Text>
                                    </View>
                                    <View style={styles.projectlistheadingAction}>
                                        <Text style={styles.textSize}>Action</Text>
                                    </View>
                                </View>
                                : null}
                            {projectlist.length > 0 ?
                                <FlatList
                                    data={projectlist}
                                    renderItem={Item}
                                    keyExtractor={item => item._id}
                                /> : <Image source={require('../../images/NoRecord.png')} />}

                        </View>}
                </ImageBackground>
            </ScrollView>
        </>
    )
}

export default ProjectList;