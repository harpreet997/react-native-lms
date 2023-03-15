import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, FlatList, Button, Alert, Modal, TextInput } from "react-native";
import { getAllLeaves } from "../../api_methods/get_methods/getmethods";
import DatePicker from 'react-native-date-picker'

const AllLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editstatus, setEditStatus] = useState(false);
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        getAllLeaves()
            .then((response) => {
                setLeaveList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleOpenModal = (id) => {
        setModalVisible(true)
        setEditStatus(id)
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
                <Button title='Delete' />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editstatus === item._id ? modalVisible : false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <ScrollView leavelist={item}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeading}>Edit Leave Status</Text>
                        <Text style={styles.text}>Employee Name: </Text>
                        <TextInput style={styles.textbox} value={item.employeeName} placeholder="Employee Name" />
                        <Text style={styles.text}>Leave Type: </Text>
                        <TextInput style={styles.textbox} value={item.leaveType} placeholder="Leave Type" />
                        <Text style={styles.text}>From Date: </Text>
                        {/* <TextInput style={styles.textbox} value={item.fromDate.substring(0, 10)} placeholder="From Date" /> */}
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD/MM/YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2000"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -5,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderColor: "gray",
                                    alignItems: "flex-start",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                },
                                placeholderText: {
                                    fontSize: 17,
                                    color: "gray"
                                },
                                dateText: {
                                    fontSize: 17,
                                }
                            }}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        />
                        <Text style={styles.text}>To Date: </Text>
                        <TextInput style={styles.textbox} value={item.toDate.substring(0, 10)} placeholder="To Date" />
                        <Text style={styles.text}>Leave Status: </Text>
                        <TextInput style={styles.textbox} value={item.status} placeholder="Leave Status" />
                        <Text style={styles.text}>Reason: </Text>
                        <TextInput multiline={true}
                            numberOfLines={4} style={styles.textbox} placeholder="Reason" />
                        <Button title='Update' onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );


    return (
        <ScrollView horizontal={true} style={{ flex: 1, margin: 2 }}>
            <View >
                <Text style={styles.textSize}>All Leaves</Text>
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
                    <View style={styles.listheading}>
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
        fontSize: 15,
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
    listbody: {
        fontSize: 12,
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