import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, Modal, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from "react-native";
import { getAllLeaves } from "../../api_methods/get_methods/getmethods";
import { deleteLeave } from "../../api_methods/post_methods/postmethod";
import EditLeaves from "./EditLeaves";
import styles from "../../globalstyles/GlobalStyles";
import Toast from 'react-native-toast-message';

const AllLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editstatus, setEditStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllLeaves()
            .then((response) => {
                setLeaveList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [leavelist]);

    const handleOpenModal = (id) => {
        setModalVisible(true)
        setEditStatus(id)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const DeleteLeaves = (id) => {
        deleteLeave(id)
            .then((response) => {
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                    visibilityTime: 2000,
                    position: "top",
                  })
                setLoading(true);
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

    const Item = ({ item, index }) => (
        <View key={index} style={[styles.LeaveListItems,
        (index % 2 === 0) ? styles.primaryBackground : styles.secondaryBackground]}>
            <View style={styles.listheading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.employeeName}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.leaveType}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.fromDate.substring(0, 10)}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.toDate.substring(0, 10)}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.status}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.reason}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <TouchableOpacity style={styles.edit} onPress={() => handleOpenModal(item._id)}>
                <Text style={styles.edittext}>Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={() => DeleteLeaves(item._id)}>
                <Text style={styles.deletetext}>Delete </Text>
            </TouchableOpacity>

            <Modal
                style={{ backgroundColor: "lightblue" }}
                animationType="slide"
                transparent={true}
                visible={editstatus === item._id ? modalVisible : false}
                onRequestClose={() => {
                    setTimeout(() => {
                        setModalVisible(!modalVisible);
                    }, 1000)

                }}>
                <EditLeaves leavelist={item} handleCloseModal={handleCloseModal} />
            </Modal>
        </View>
    );


    return (
        
        <ScrollView horizontal={true} >
            <ImageBackground style={{width: "100%"}} source={require('../../images/logo.jpg')} >
            {loading ?
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator style={styles.indicator} size="large" />
                    <Text style={styles.indicatorText}>Loading ...</Text>
                </View>
                :
                <View >
                    {leavelist.length > 0 ?
                        <View style={styles.listheadingContainer}>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Name</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Leave Type</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>From Date</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>To Date</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Status</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheading}>
                                <Text style={styles.textSize}>Reason</Text>
                            </View>
                            <View style={styles.verticalline}>
                                <Text >|</Text>
                            </View>
                            <View style={styles.listheadingAction}>
                                <Text style={styles.textSize}>Action</Text>
                            </View>
                        </View>
                        : null}

                    {leavelist.length > 0 ?
                        <FlatList
                        
                            data={leavelist}
                            renderItem={Item}
                            keyExtractor={(item) => item._id}
                        /> : <Image source={require('../../images/NoRecord.png')} />}
                </View>
            }
            </ImageBackground>
        </ScrollView>
        
    )
}

export default AllLeaves;