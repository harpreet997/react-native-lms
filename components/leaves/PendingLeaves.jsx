import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, Alert, Modal, TouchableOpacity, Image } from "react-native";
import { getAllLeaves } from "../../api_methods/get_methods/getmethods";
import { deleteLeave } from "../../api_methods/post_methods/postmethod";
import EditLeaves from "./EditLeaves";
import styles from "../../globalstyles/GlobalStyles";

const PendingLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editstatus, setEditStatus] = useState(false);
    const pendingleaves = leavelist.filter(item => item.status === 'Pending')

    useEffect(() => {
        getAllLeaves()
            .then((response) => {
                setLeaveList(response.data.data);
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
                Alert.alert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const Item = ({ item, index }) => (
        <View key={index} style={[{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black', margin: 3 }, 
        (index % 2 === 0) ? { backgroundColor: "coral" } : { backgroundColor: "yellow" }]}>
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
        <ScrollView horizontal={true} style={{ flex: 1, margin: 2 }}>
            <View >
                {pendingleaves.length > 0 ?
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black', margin: 3 }}>
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

                {pendingleaves.length > 0 ?
                    <FlatList
                        data={pendingleaves}
                        renderItem={Item}
                        keyExtractor={item => item.i}
                    /> : <Image source={require('../../images/NoRecord.png')} />}
            </View>
        </ScrollView>
    )
}

export default PendingLeaves;