import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { editLeave } from '../../api_methods/post_methods/postmethod';

const EditLeaves = ({ leavelist, handleCloseModal }) => {

    const [editleavedata, setEditLeavedata] = useState({
        employeeName: leavelist.employeeName,
        reason: leavelist.reason,
        leaveType: leavelist.leaveType,
        fromDate: leavelist.fromDate.substring(0, 10),
        toDate: leavelist.toDate.substring(0, 10),
        status: leavelist.status,
        _id: leavelist._id
    });

    const handleChange = (text, input) => {
        setEditLeavedata({
            ...editleavedata,
            [input]: text
        })
    }

    const UpdateStatus = (id) => {
        editLeave(id, editleavedata)
            .then((response) => {
                Alert.alert(response.data.message);
                handleCloseModal();
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <ScrollView >
            <View style={styles.modalView}>
                <Text style={styles.modalHeading}>Edit Leave Status</Text>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} value={editleavedata.employeeName}
                    onChangeText={(text) => handleChange(text, 'employeeName')} editable={false}
                    placeholder="Employee Name" />
                <Text style={styles.text}>Leave Type: </Text>
                <TextInput style={styles.textbox} value={editleavedata.leaveType}
                    onChangeText={(text) => handleChange(text, 'leaveType')} editable={false}
                    placeholder="Leave Type" />
                <Text style={styles.text}>From Date: </Text>
                <DatePicker style={styles.datepicker} mode="calendar" selected={editleavedata.fromDate}
                    onDateChange={(text) => handleChange(text, 'fromDate')} />
                <Text style={styles.text}>To Date: </Text>
                <DatePicker style={styles.datepicker} mode="calendar" selected={editleavedata.toDate}
                    onDateChange={(text) => handleChange(text, 'toDate')} />
                <Text style={styles.text}>Leave Status: </Text>
                <Picker
                    style={styles.select}
                    selectedValue={editleavedata.status}
                    onValueChange={(itemValue) => handleChange(itemValue, 'status')}
                >
                    <Picker.Item label="Approved" value="Approved" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Rejected" value="Rejected" />
                </Picker>
                <Text style={styles.text}>Reason: </Text>
                <TextInput multiline={true}
                    numberOfLines={4} style={styles.textbox} value={editleavedata.reason} onChangeText={(text) => setReason(text, 'reason')} placeholder="Reason"
                    placeholderTextColor={"black"} />
                <Button title='Update' onPress={() => UpdateStatus(editleavedata._id)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 15,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },
    modalHeading: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "black"
    },
    textbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },
    select: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black"
    },
    datepicker: {
        backgroundColor: "lightgreen"
    }
})

export default EditLeaves;