import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, ActivityIndicator, Image, ImageBackground } from "react-native";
import { getAllLeaves } from "../../../api_methods/get_methods/getmethods";
import styles from "../../../globalstyles/GlobalStyles";

const UserAllLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
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
        </View>
    );


    return (
        <ScrollView horizontal={true} >
            <ImageBackground style={{width: "100%"}} source={require('../../../images/logo.jpg')} >
            {loading ?
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator style={styles.indicator} size="large" />
                    <Text style={styles.indicatorText}>Loading ...</Text>
                </View>
                :
                <View>
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
                                <Text style={styles.textSize}>Reasons</Text>
                            </View>
                            
                        </View>
                        : null}

                    {leavelist.length > 0 ?
                        <FlatList
                            data={leavelist}
                            renderItem={Item}
                            keyExtractor={(item) => item._id}
                        /> : <Image source={require('../../../images/NoRecord.png')} />}
                </View>
            }
            </ImageBackground>
        </ScrollView>
    )
}

export default UserAllLeaves;