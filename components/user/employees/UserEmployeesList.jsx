import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { getEmployees } from "../../../api_methods/get_methods/getmethods";
import styles from "../../../globalstyles/GlobalStyles";

const UserEmployeesList = ({ headers }) => {
    const [employeelist, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEmployees(headers)
            .then((response) => {
                setEmployeeList(response.data.data);
                console.log(response.data.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [employeelist]);
    
    const Item = ({ item, index }) => (
        <View key={index} style={[styles.employeesListItems,
        (index % 2 === 0) ? styles.primaryBackground : styles.secondaryBackground]}>
            <View style={styles.employeesListHeading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.employeesListHeading}>
                <Text style={styles.listbody}>{item.email}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
        </View>
    );


    return (
            <ScrollView horizontal={true} style={{ backgroundColor: "lightgreen" }}>
                {loading ?
                    <View style={styles.indicatorWrapper}>
                        <ActivityIndicator style={styles.indicator} size="large" />
                        <Text style={styles.indicatorText}>Loading ...</Text>
                    </View>
                    :
                    <View>
                        {employeelist.length > 0 ?
                            <View style={styles.listheadingContainer}>
                                <View style={styles.employeesListHeading}>
                                    <Text style={styles.textSize}>Employee Name</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.employeesListHeading}>
                                    <Text style={styles.textSize}>Email Address</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                
                            </View>
                            : null}

                        {employeelist.length > 0 ?
                            <FlatList
                                data={employeelist}
                                renderItem={Item}
                                keyExtractor={item => item.i}
                            /> : <Image source={require('../../../images/NoRecord.png')} />}

                    </View>}
            </ScrollView>
    )
}

export default UserEmployeesList;