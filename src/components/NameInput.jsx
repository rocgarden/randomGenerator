import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const NameInput = ({name, setName, handleAddName}) => {
  const [scale] = useState(new Animated.Value(1));

  const animatePress = () => {
    Animated.sequence([
      Animated.spring(scale, {toValue: 0.95, useNativeDriver: true}),
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
    ]).start();
    handleAddName();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Alex"
        placeholderTextColor="#999"
      />
        {/* <Text style={styles.title}>📝 Add Name</Text> */}

        <Animated.View style={{transform: [{scale}]}}>
          <TouchableOpacity style={styles.button} onPress={animatePress}>
            <Text style={styles.buttonText}>➕ </Text>
          </TouchableOpacity>
        </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#d6c8ff',
    padding: 3,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    width: '90%',
    alignSelf: 'center',
   // marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Marker Felt',
    color: '#2d3436',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#6f42c1',
    borderRadius: 50,
    padding: 12,
    fontSize: 16,
    // width: '50%',
    marginHorizontal: 16,
    fontFamily: 'System',
    backgroundColor: '#fdfdfd',
  },
  button: {
    //backgroundColor: '#fdcb6e',
    paddingVertical: 8,
    borderRadius: 100,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Marker Felt',
  },
});


export default NameInput;
