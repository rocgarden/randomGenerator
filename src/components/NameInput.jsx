import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable
} from 'react-native';

const NameInput = ({ name, setName, handleAddName}) => {
    const handleTextChange = (e) => {
        setName(e);
    }
    return (
      <View style={styles.container}>
        {/* <View style={styles.imageContainer}>
            <Image
                    source={require(".../assets/vector.png")}
                    style={styles.topImage}
            />
        </View> */}
        <View style={styles.nameInputText}>
          <Text style={{fontSize: 15,fontFamily: 'Marker Felt'}}>Create List</Text>
        </View>
        <View style={{overflow: 'hidden'}}>
          <TextInput
            style={styles.inputContainer}
            value={name}
            onChangeText={handleTextChange}
            placeholder="Enter a name..."
          />
          <View style={styles.button}>
            <Pressable onPress={handleAddName}>
              <Text style={styles.buttonStyle}>Add Name</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );

};


const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 'auto',
    backgroundColor: '#FFF',
    borderRadius: 20,
    // minHeight: 500,
    maxWidth: 500,
    minWidth: 250,
    boxShadow: '4px 3px 7px 2px #00000040',
    padding: 16,
    boxSizing: 'border-box',
  },
  nameInputText: {
    marginBottom: 30,
    // transform: 'rotate(2deg)',
    // paddingLeft: 5,
    // paddingRight: 5,
    // padding: 8,
    // borderTopLeftRadius: '5%',
    // borderTopRightRadius: '20%',
    // borderBottomLeftRadius: '25%',
    // borderBottomLeftRadius: '20%',
    // backgroundColor: '#fdcb6e',
    alignItems: 'center',
  },
  inputContainer: {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    padding: 3,
    borderColor: '#fdcb6e',
    borderStyle: 'dashed',
    borderWidth: 3,
    color: 'hsla(260, 2%, 25%, 0.7)',
    marginBottom: 20,
    margin: -4,
  },
  button: {
  padding: 3,
  textDecoration: 'none',
  paddingBottom: 3,
  borderRadius: 5,
  border:"none",
  alignItems:'center',
  justifyContent:'center'
  },
  buttonStyle:{
  background: '#f1f5f8',
  display: 'flex',
  padding: 5,
  borderRadius: 5,
  borderWidth: 2,
  borderStyle: 'solid',
  color:  'hsl(198, 1%, 29%)',
  fontFamily:"Marker Felt"
  }
  
});

export default NameInput;

