import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button, Alert, Modal } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { getEmployees } from '../../api_methods/get_methods/getmethods'

export default function EmployeesList({headers}) {
    const [employeelist, setEmployeeList] = useState([]);

    useEffect(() => {
        getEmployees(headers)
            .then((response) => {
                setEmployeeList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const Item = ({ item, i }) => (
        <View key={i} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
            <View style={styles.listheading}>
                <Text style={[styles.listbody, styles.textCaptital]}>{item.name}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            <View style={styles.listheading}>
                <Text style={styles.listbody}>{item.email}</Text>
            </View>
            <View style={styles.verticalline}>
                <Text >|</Text>
            </View>
            
            <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                <Button title='Edit' color={'green'} />
                <Text>|</Text>
                <Button title='Delete' />
            </View>

            {/* <Modal
            style={{backgroundColor: "lightblue"}}
                animationType="slide"
                transparent={true}
                visible={editstatus === item._id ? modalVisible : false}
                onRequestClose={() => {
                    setTimeout(() => {
                        setModalVisible(!modalVisible);
                    }, 2000)
                    
                }}>
                <EditLeaves leavelist={item} handleCloseModal={handleCloseModal}/>  
            </Modal> */}
        </View>
    );

  return (
    <ScrollView horizontal={true} style={{ flex: 1, margin: 2 }}>
            <View >
                
                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
                    <View style={styles.listheading}>
                        <Text style={styles.textSize}>Employee Name</Text>
                    </View>
                    <View style={styles.verticalline}>
                        <Text >|</Text>
                    </View>
                    <View style={styles.listheading}>
                        <Text style={styles.textSize}>Email Address</Text>
                    </View>
                    <View style={styles.verticalline}>
                        <Text >|</Text>
                    </View>
                    <View style={styles.listheadingAction}>
                        <Text style={styles.textSize}>Action</Text>
                    </View>
                </View>
                <FlatList
                    data={employeelist}
                    renderItem={Item}
                    keyExtractor={item => item.i}
                />

            </View>
        </ScrollView>
  )
}


const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2
    },
    textSize: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
        color: "black"
    },
    
    listheading: {
        width: 100,
        backgroundColor: 'coral'
    },
    listheadingAction: {
        width: 120,
        backgroundColor: 'coral'
    },
    listbody: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        color: 'black'
    },
    verticalline: {
        backgroundColor: 'coral'
    },
    textCaptital: {
        textTransform: 'capitalize',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    text: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
})