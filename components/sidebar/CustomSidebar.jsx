import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebar = (props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#BD9DBF"}}>
      <Image
       source={require('../../images/headerlogo.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView> 
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },

});

export default CustomSidebar;