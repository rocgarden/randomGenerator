import React, {useState} from 'react';
import {Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
 import { useNavigation } from '@react-navigation/native';
const CreateGroupsButton = ({ state, }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('CreateGroups', {
            state
          });
        }}
        //disabled={isDisabled}
      >
        <Text style={styles.buttonText}>  Groups</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 5,
    width: 90,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  button: {
    width: '100%',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  buttonText: {
    fontFamily: 'Marker Felt',
    fontSize: 18,
  },
});
export default CreateGroupsButton;
    // marginBottom: 30,
    // transform: 'rotate(2deg)',
    // paddingLeft: 5,
    // paddingRight: 5,
    // padding: 8,
    // borderTopLeftRadius: '5%',
    // borderTopRightRadius: '20%',
    // borderBottomLeftRadius: '25%',
    // borderBottomLeftRadius: '20%',
    // backgroundColor: '#fdcb6e',
    // alignItems: 'center',