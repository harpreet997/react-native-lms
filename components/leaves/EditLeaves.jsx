import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { editLeave } from '../../api_methods/post_methods/postmethod';

const EditLeaves = ({ leavelist, handleCloseModal}) => {
    const [employeeName, setEmployeeName] = useState(leavelist.employeeName);
    const [leaveType, setLeaveType] = useState(leavelist.leaveType);
    const [fromDate, setFromDate] = useState(leavelist.fromDate.substring(0, 10));
    const [toDate, setToDate] = useState(leavelist.toDate.substring(0, 10));
    const [reason, setReason] = useState(leavelist.reason);
    const [status, setStatus] = useState(leavelist.status);
    const id = leavelist._id;

    const UpdateStatus = (id) => {
        const payload = {
            employeeName: employeeName,
            leaveType: leaveType,
            fromDate: fromDate,
            toDate: toDate,
            status: status,
            reason: reason,
            _id: id
        }
        editLeave(id, payload)
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
                <TextInput style={styles.textbox} value={employeeName} onChangeText={(text) => setEmployeeName(text)} editable={false}
                    placeholder="Employee Name" />
                <Text style={styles.text}>Leave Type: </Text>
                <TextInput style={styles.textbox} value={leaveType} onChangeText={(text) => setLeaveType(text)} editable={false}
                    placeholder="Leave Type" />
                <Text style={styles.text}>From Date: </Text>
                <DatePicker mode="calendar" selected={fromDate} onDateChange={setFromDate} />
                <Text style={styles.text}>To Date: </Text>
                <DatePicker mode="calendar" selected={toDate} onDateChange={setToDate} />
                <Text style={styles.text}>Leave Status: </Text>
                <Picker
                    selectedValue={status}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item label="Approved" value="Approved" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Rejected" value="Rejected" />
                </Picker>
                <Text style={styles.text}>Reason: </Text>
                <TextInput multiline={true}
                    numberOfLines={4} style={styles.textbox} value={reason} onChangeText={(text) => setReason(text)} placeholder="Reason" />
                <Button title='Update' onPress={() => UpdateStatus(id)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
})

export default EditLeaves;