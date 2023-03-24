import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import { Picker } from '@react-native-picker/picker';
import { applyLeave } from '../../api_methods/post_methods/postmethod';


const ApplyLeave = (props) => {
    const [leavedata, setLeavedata] = useState({
        employeeName: "",
        reason: "",
        leaveType: "",
        fromDate: "",
        toDate: ""
    });

    const [refreshing, setRefreshing] = useState(false);

    const handleChange = (text, input) => {
        setLeavedata({
            ...leavedata,
            [input]: text
        });
    };

    const handleApplyLeave = () => {
        applyLeave(leavedata)
            .then((response) => {
                Alert.alert(response.data.message);
                setLeavedata({})
                setTimeout(() => {
                    props.navigation.navigate("All Leaves")
                }, 2000)
            }
            )
            .catch((error) => {
                Alert.alert(error.response.data.message);
            })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }, []);

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={styles.main}>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Employee Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'employeeName')} />
                <Text style={styles.text}>Leave Type: </Text>
                <Picker
                    onValueChange={(itemValue) => handleChange(itemValue, 'leaveType')}
                    selectedValue={leavedata.leaveType}
                >
                    <Picker.Item label="Select Leave Type" value="" />
                    <Picker.Item label="Sick Leave" value="SL" />
                    <Picker.Item label="Casual Leave" value="CL" />
                    <Picker.Item label="Half day" value="Half Day" />
                </Picker>

                <Text style={styles.text}>From Date: </Text>
                <DatePicker style={styles.datapicker} mode="calendar" onDateChange={(text) => handleChange(text, 'fromDate')} />
                <Text style={styles.text}>To Date: </Text>
                <DatePicker style={styles.datapicker} mode="calendar" onDateChange={(text) => handleChange(text, 'toDate')} />
                <Text style={styles.text}>Reason: </Text>
                <TextInput multiline={true}
                    numberOfLines={4} style={styles.textbox} onChangeText={(text) => handleChange(text, 'reason')} placeholder="Enter Reason"
                    placeholderTextColor={"black"} />
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
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        color: "black"
    },
    textbox: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        color: "black"
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
    },
    datapicker: {
        backgroundColor: "lightgreen",
    }
})

export default ApplyLeave