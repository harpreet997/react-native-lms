import { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { editLeave } from '../../api_methods/post_methods/postmethod';
import styles from '../../globalstyles/GlobalStyles';
import Toast from 'react-native-toast-message';

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
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                    visibilityTime: 2000,
                    position: "top",
                  })
                setTimeout(() => {
                    handleCloseModal();
                }, 2000)
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
                <DatePicker style={{ backgroundColor: "lightgrey" }} mode="calendar" selected={editleavedata.fromDate}
                    onDateChange={(text) => handleChange(text, 'fromDate')} />
                <Text style={styles.text}>To Date: </Text>
                <DatePicker style={{ backgroundColor: "lightgrey" }} mode="calendar" selected={editleavedata.toDate}
                    onDateChange={(text) => handleChange(text, 'toDate')} />
                <Text style={styles.text}>Leave Status: </Text>
                <Picker
                    style={styles.selectLeave}
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



export default EditLeaves;