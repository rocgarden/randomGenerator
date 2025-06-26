import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, Button, FlatList} from 'react-native';
import {useNameList} from '../context/NamesListContext';

const ShuffledNamesModal = ({state, closeModal}) => {
  // const { state } = useNameList();
  // const names = state.shuffledNames;
  console.log('state from modal:: ', state.shuffledNames);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const toggleModal = () => {
  //     setIsModalVisible(!isModalVisible);
  //   };
  const isTwoColumns = state.shuffledNames.length > 4; // Show two columns if there are more than 4 names

  const renderItem = ({item, index}) => {
    // Alternate background color for every other row
    const backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#dcdcdc'; // Light gray shades
    return (
      <View style={[styles.nameItem, {backgroundColor}]}>
        <Text style={styles.nameText}>{item}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide" // Animation when modal appears/disappears
      transparent={true} // Make the background semi-transparent
      visible={true} // Control the visibility of the modal
      onRequestClose={closeModal} // Close the modal when the Android back button is pressed
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Display shuffled names or a message */}
          <Text style={styles.modalText}>
            Names:
            {/* {state.shuffledNames.length > 0
                ? state.shuffledNames.join(', ')
                : 'No names shuffled'} */}
          </Text>
          {/* FlatList renders names */}
          {/* <FlatList
            data={state.shuffledNames}
            keyExtractor={(item, index) => index.toString()}
            numColumns={isTwoColumns ? 2 : 1} // Switch between 1 and 2 columns
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          /> */}
          <FlatList
            data={state.shuffledNames}
            keyExtractor={({item}, index) => index.toString()}
            renderItem={renderItem}
            horizontal={false}
            numColumns={2}
          />

          {/* Button to close the modal */}
          <Button
            title="Close"
            onPress={closeModal} // Close modal on button press
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShuffledNamesModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Modal width
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#EE3253',
    fontSize: 25,
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingTop: 10,
  },
  nameItem: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
});
