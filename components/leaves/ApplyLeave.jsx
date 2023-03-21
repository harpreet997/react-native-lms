import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState} from 'react'
import DatePicker from 'react-native-modern-datepicker';
import { Picker } from '@react-native-picker/picker';
import { applyLeave } from '../../api_methods/post_methods/postmethod';


export default function ApplyLeave(props) {
    const [employeeName, setEmployeeName] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const handleApplyLeave = () => {
        const payload = {
            employeeName: employeeName,
            reason: reason,
            leaveType: leaveType,
            fromDate: fromDate,
            toDate: toDate
        }
       
        applyLeave(payload)
        .then((response) => {
            Alert.alert(response.data.message);
            setTimeout(() => {
                props.navigation.navigate("All Leaves")
            }, 2000)
        }
        )
        .catch((error) => {
            Alert.alert(error.response.data.message);
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Employee Name' placeholderTextColor={"black"}
                    onChangeText={(text) => setEmployeeName(text)} />
                <Text style={styles.text}>Leave Type: </Text>
                <Picker
                    onValueChange={(itemValue) => setLeaveType(itemValue)}
                    selectedValue={leaveType}
                >
                    <Picker.Item label="Select Leave Type" value="" />
                    <Picker.Item label="Sick Leave" value="SL" />
                    <Picker.Item label="Casual Leave" value="CL" />
                    <Picker.Item label="Half day" value="Half Day" />
                </Picker>
               
                <Text style={styles.text}>From Date: </Text>
                <DatePicker mode="calendar" onDateChange={setFromDate} />
                <Text style={styles.text}>To Date: </Text>
                <DatePicker mode="calendar" onDateChange={setToDate} />
                <Text style={styles.text}>Reason: </Text>
                <TextInput multiline={true}
                    numberOfLines={4} style={styles.textbox} onChangeText={(text) => setReason(text)} placeholder="Reason" />
                <TouchableOpacity style={styles.login} onPress={handleApplyLeave}>
                    <Text style={styles.logintext} >Apply Leave</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        paddingTop: 20,

    },
    main: {
        justifyContent: 'center',
        paddingBottom: 30
    },
    text: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textbox: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    items: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'orange',
        marginBottom: 5,
        borderWidth: 1
    },
    button: {
        margin: 10,
        alignItems: 'center'
    },
    login: {
        backgroundColor: 'dodgerblue',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: "20%"
    },
    logintext: {
        fontSize: 18,
        fontWeight: "bold"
    }
})