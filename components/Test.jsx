import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const Test = () => {
  return (
    <ScrollView horizontal={true} style={{ flex: 1, margin: 2 }}>
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title >Name</DataTable.Title>
        <DataTable.Title >Favourite Food</DataTable.Title>
        <DataTable.Title >Age</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Favourite Food</DataTable.Title>
        <DataTable.Title>Age</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell>Radhika</DataTable.Cell>
        <DataTable.Cell>Dosa</DataTable.Cell>
        <DataTable.Cell>23</DataTable.Cell>
        <DataTable.Cell>Radhika</DataTable.Cell>
        <DataTable.Cell>Dosa</DataTable.Cell>
        <DataTable.Cell>23</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
    </ScrollView>
  );
};
  
export default Test;
  
const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 0,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    width: 500
  },
});