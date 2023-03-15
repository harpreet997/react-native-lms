import {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const EditLeaves = () => {
    return ( 
        <ScrollView>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeading}>Edit Leave Status</Text>
                        <Text style={styles.text}>Employee Name: </Text>
                        <TextInput style={styles.textbox} placeholder="Employee Name" />
                        <Text style={styles.text}>Leave Type: </Text>
                        <TextInput style={styles.textbox} placeholder="Leave Type" />
                        <Text style={styles.text}>From Date: </Text>
                        <TextInput style={styles.textbox} placeholder="From Date" />
                        <Text style={styles.text}>To Date: </Text>
                        <TextInput style={styles.textbox} placeholder="To Date" />
                        <Text style={styles.text}>Leave Status: </Text>
                        <TextInput style={styles.textbox} placeholder="Leave Status" />
                        <Text style={styles.text}>Reason: </Text>
                        <TextInput multiline={true}
                            numberOfLines={4} style={styles.textbox} placeholder="Reason" />
                        <Button title='Update' onPress={() => setModalVisible(!modalVisible)} />
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