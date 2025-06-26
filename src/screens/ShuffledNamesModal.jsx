import React, {useState, useEffect} from 'react';
import { useWindowDimensions,View, StyleSheet, Text, Modal, Button, FlatList} from 'react-native';
import {useNameList} from './NamesListContext';

  


const ShuffledNamesModal = ({ state, closeModal }) => {
    // const { state } = useNameList();
    // const names = state.shuffledNames;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };
//   const isTwoColumns = state.shuffledNames.length > 4; // Show two columns if there are more than 4 names

//   const renderItem = ({item, index}) => {
//     // Alternate background color for every other row
//     const backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#dcdcdc'; // Light gray shades
//     return (
//       <View style={[styles.nameItem, {backgroundColor}]}>
//         <Text style={styles.nameText}>{item}</Text>
//       </View>
//     );
    //   };
     const minCols = 2;

   const calcNumColumns = width => {
     const cols = width / styles.item.width;
     const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
     const colsMinusMargin = cols - 2 * colsFloor * styles.item.margin;
     if (colsMinusMargin < colsFloor && colsFloor > minCols) {
       return colsFloor - 1;
     } else return colsFloor;
   };

    const formatData = (data, numColumns) => {
       // const data = state.shuffledNames;
     const amountFullRows = Math.floor(data.length / numColumns);
     let amountItemsLastRow = data.length - amountFullRows * numColumns;

     while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
       data.push({key: `empty-${amountItemsLastRow}`, empty: true});
       amountItemsLastRow++;
     }
     return data;
   };

   const renderItem = ({item, index}) => {
     if (item.empty) {
       return <View style={[styles.item, styles.itemTransparent]} />;
     }
     return (
       <View style={styles.item}>
         <Text style={styles.itemText}>{index +1}. {item}</Text>
       </View>
     );
   };
 
    
       const {width} = useWindowDimensions();
       const [numColumns, setNumColumns] = useState(calcNumColumns(width));

       useEffect(() => {
         setNumColumns(calcNumColumns(width));
       }, [width]);


  return (
    <Modal
      animationType="slide" // Animation when modal appears/disappears
      transparent={true} // Make the background semi-transparent
      visible={true} // Control the visibility of the modal
      onRequestClose={closeModal} // Close the modal when the Android back button is pressed
    >
      <View style={styles.centeredView}>
        <View>
          {/* Display shuffled names or a message */}
          <Text style={styles.modalText}>
            Shuffled Names:
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
          {/* <FlatList //--------------------------------------->using this flatlist
              data={state.shuffledNames}
              keyExtractor={({item}, index) => index.toString()}
              renderItem={renderItem}
              horizontal={false}
              numColumns={2}
            /> */}

          <FlatList
            keyExtractor={({item}, index) => index.toString()}
            data={state.shuffledNames}
            numColumns={numColumns}
            renderItem={renderItem}
            style={styles.itemText}
          />

          {/* Button to close the modal */}
          <Button
            color={'dark'}
            title="← Reshuffle Names"
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
    //alignItems: 'center',
    //marginTop: 22,
    padding: 8,
    backgroundColor: '#ffeaa7', // Background overlay
  },
  modalView: {
    //backgroundColor: 'white',
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
    color: '#333',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Marker Felt',
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
  item: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 80,
    width: 70,
    borderRadius: 10,
  },
  itemTransparent: {
    backgroundColor: 'transparent',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Marker Felt',
  },
});
