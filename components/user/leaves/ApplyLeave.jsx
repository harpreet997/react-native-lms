import { View, Text, ScrollView, TextInput, TouchableOpacity, RefreshControl, ImageBackground } from 'react-native'
import React, { useState, useCallback } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import { Picker } from '@react-native-picker/picker';
import { applyLeave } from '../../../api_methods/post_methods/postmethod';
import styles from '../../../globalstyles/GlobalStyles';
import Toast from 'react-native-toast-message';

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
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                    visibilityTime: 1000,
                    position: "top",
                  })
                setTimeout(() => {
                    setLeavedata({})
                    props.navigation.navigate("All Leaves")
                }, 2000)
            }
            )
            .catch((error) => {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message,
                    visibilityTime: 1000,
                    position: "top",
                  })
            })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }, []);

    return (
        <ImageBackground style={styles.applyLeaveContainer} source={require('../../../images/logo.jpg')} >
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={styles.applyLeaveMain}>
                <Text style={styles.text}>Employee Name: </Text>
                <TextInput style={styles.textbox} placeholder='Enter Employee Name' placeholderTextColor={"black"}
                    onChangeText={(text) => handleChange(text, 'employeeName')} />
                <Text style={styles.text}>Leave Type: </Text>
                <Picker
                    onValueChange={(itemValue) => handleChange(itemValue, 'leaveType')}
                    selectedValue={leavedata.leaveType}
                    style={styles.selectLeave}
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
                    numberOfLines={2} style={styles.textbox} onChangeText={(text) => handleChange(text, 'reason')} placeholder="Enter Reason"
                    placeholderTextColor={"black"} />
                <TouchableOpacity style={styles.applyLeave} onPress={handleApplyLeave}>
                    <Text style={styles.applyLeaveText} >Apply Leave</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

export default ApplyLeave