import React  from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';


const ShuffleNames = ({ state,isDisabled, handleShuffleNames}) => {
 

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        disabled={isDisabled}
        onPress={handleShuffleNames}>
        <Text style={styles.buttonText}>Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 'auto',
  },
  button: {
    height: 'auto',
    width: '100%',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6f42c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
   // fontFamily: 'Marker Felt',
    fontSize: 18,
    fontWeight:'bold',
    color: '#6f42c1',
  },
});
export default ShuffleNames;
