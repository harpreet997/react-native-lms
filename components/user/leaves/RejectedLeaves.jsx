import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, Image, ActivityIndicator } from "react-native";
import { getAllLeaves } from "../../../api_methods/get_methods/getmethods";
import styles from "../../../globalstyles/GlobalStyles";

const RejectedLeaves = () => {
    const [leavelist, setLeaveList] = useState([]);
    const [loading, setLoading] = useState(true);
    const rejectedleaves = leavelist.filter(item => item.status === 'Rejected')

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


    
    const Item = ({ item, index }) => {
        return (
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
        )
    };

    return (
        <ScrollView horizontal={true} style={{ backgroundColor: "lightgreen" }}>
            {loading ?
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator style={styles.indicator} size="large" />
                    <Text style={styles.indicatorText}>Loading ...</Text>
                </View>
                :
                <View>
                    {rejectedleaves.length > 0 ?
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
                                <Text style={styles.textSize}>Reason</Text>
                            </View>
                        </View>
                        : null}

                    {rejectedleaves.length > 0 ?
                        <FlatList
                            data={rejectedleaves}
                            renderItem={Item}
                            keyExtractor={item => item.i}
                        /> : <Image source={require('../../../images/NoRecord.png')} />}

                </View>}
        </ScrollView>
    )
}

export default RejectedLeaves;