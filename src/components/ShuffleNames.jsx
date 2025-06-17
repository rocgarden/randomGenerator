import React ,{useState} from 'react';
import {Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';


const ShuffleNames = ({ state,isDisabled, handleShuffleNames}) => {
 

  return (
    <View style={styles.container}>
      {/* <Button
        title="Shuffle Names"
        onPress={handleShuffleNames}
        disabled={isDisabled}
        color="#841584"
        style={styles.button}
      /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleShuffleNames}
        disabled={isDisabled}>
        <Text style={styles.buttonText}>Shuffle</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:5,
    width: 90,
    height: 'auto',
    alignItems: 'center',
    justifyContent:'center',
    // backgroundColor: '#f1f5f8',
    //borderRadius: 20,
    // minHeight: 500,
    maxWidth: 300,
    //minWidth: 150,
    //boxShadow: '4px 3px 7px 2px #00000040',
    padding: 5,
    //boxSizing: 'border-box',
  },
  button: {
    width:'100%',
    padding:5,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    //color: 'hsl(198, 1%, 29%)',
  },
  buttonText: {
    fontFamily: 'Marker Felt',
    fontSize: 18,
  },
});
export default ShuffleNames;
