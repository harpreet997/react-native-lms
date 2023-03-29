import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import { getProjects } from '../../../api_methods/get_methods/getmethods'
import styles from "../../../globalstyles/GlobalStyles";

const UserProjectList = ({ headers }) => {
    const [projectlist, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [projectlist]);

    const Item = ({ item, index }) => (
        <View key={index} style={[styles.projectlistItems,
        (index % 2 === 0) ? styles.primaryBackground : styles.secondaryBackground]}>
            <View style={styles.projectlistheading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientName}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientPhoneNumber}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.projectlistheading}>
                <Text style={styles.listbody}>{item.clientEmail}</Text>
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
                        {projectlist.length > 0 ?
                            <View style={styles.listheadingContainer}>
                                <View style={styles.projectlistheading}>
                                    <Text style={styles.textSize}>Project Name</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.projectlistheading}>
                                    <Text style={styles.textSize}>Client Name</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.projectlistheading}>
                                    <Text style={styles.textSize}>Client's Contact No.</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                <View style={styles.projectlistheading}>
                                    <Text style={styles.textSize}>Client's Email Address</Text>
                                </View>
                                <View style={styles.verticalline}>
                                    <Text >|</Text>
                                </View>
                                
                            </View>
                            : null}
                        {projectlist.length > 0 ?
                            <FlatList
                                data={projectlist}
                                renderItem={Item}
                                keyExtractor={item => item.i}
                            /> : <Image source={require('../../../images/NoRecord.png')} />}

                    </View>}
            </ScrollView>
    )
}

export default UserProjectList;