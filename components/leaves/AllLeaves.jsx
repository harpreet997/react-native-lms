import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, FlatList, Button, Alert, Modal } from "react-native";
import { getAllLeaves } from "../../api_methods/get_methods/getmethods";
import { deleteLeave } from "../../api_methods/post_methods/postmethod";
import EditLeaves from "./EditLeaves";

const AllLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editstatus, setEditStatus] = useState(false);
   
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

    const Item = ({ item, i }) => (
        <View key={i} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
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
            <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                <Button title='Edit' color={'green'} onPress={() => handleOpenModal(item._id)} />
                <Text>|</Text>
                <Button title='Delete' onPress={() => DeleteLeaves(item._id)}/>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editstatus === item._id ? modalVisible : false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setTimeout(() => {
                        setModalVisible(!modalVisible);
                    }, 2000)
                    
                }}>

                <EditLeaves leavelist={item} handleCloseModal={handleCloseModal}/>

                
            </Modal>
        </View>
    );


    return (
        <ScrollView horizontal={true} style={{ flex: 1, margin: 2 }}>
            <View >
                
                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
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
                <FlatList
                    data={leavelist}
                    renderItem={Item}
                    keyExtractor={item => item.i}
                />

            </View>
        </ScrollView>
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
    },
    listtextSize: {
        marginRight: 5,
        borderRightWidth: 2
    },
    listheading: {
        width: 100,
        backgroundColor: 'coral'
    },
    listheadingAction: {
        width: 120,
        backgroundColor: 'coral'
    },
    listbody: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
    },
    verticalline: {
        backgroundColor: 'coral'
    },
    textCaptital: {
        textTransform: 'capitalize',
    },
    modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    main: {
        justifyContent: 'center',
        paddingBottom: 30
    },
    text: {
        // marginLeft: 5,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
        // textAlign: 'center'
    },
    modalHeading: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        // marginLeft: 5,
        marginRight: 10
    },
    datePickerStyle: {
        width: 230,
    },
})

export default AllLeaves;