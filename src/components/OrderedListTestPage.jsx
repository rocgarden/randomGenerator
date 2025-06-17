import {useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const OrderedNameListTestPage = ({names, handleDeleteName}) => {
  //Function to split the list of names into two columns (odd and even indexed)
//   const transformToTwoColumns = (names) => {
//       const firstColumn = names.filter((_, index) => index % 2 === 0); // Names at even indices (0, 2, 4, ...)
//       const secondColumn = names.filter((_, index) => index % 2 !== 0); // Names at odd indices (1, 3, 5, ...)
//       return { firstColumn, secondColumn };
//   };

//   const { firstColumn, secondColumn } = transformToTwoColumns(names);

//   const renderRow = ({ item, index }) => {
//       const backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#dcdcdc"; // Alternating row colors
//       return (
//         <View style={[styles.row, {backgroundColor}]}>
//           <Text style={styles.nameText}>{firstColumn[index]}</Text>
//           {(<Text>secondColumn[index]</Text>) && (
//             <Text style={styles.nameText}>{secondColumn[index]}</Text>
//           )}
//           {/* Display second column if it exists */}
//         </View>
//       );
//   };
//   const maxLength = Math.max(firstColumn.length, secondColumn.length);
//   const rows = [];
//   for (let i = 0; i < maxLength; i++) {
//       rows.push({
//           left: firstColumn[i],  // Name from first column
//           right: secondColumn[i], // Name from second column
//       });
//   }

  const renderItem = ({item, index}) => (
    <Pressable onPress={() => handleDeleteName(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.nameItemText}>
          {index + 1}. {item}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.studentsTextTitle}>Students: </Text>
        <Text style={styles.nameItemText}>Tap Name to Delete </Text>
      </View>
      
      <View style={styles.item}>
        <FlatList
          data={names}
          renderItem={renderItem}
          keyExtractor={({item}, index) => index.toString()}
        //   contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    textAlign: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#fdcb6e',
    padding: 8,
    height: '50%',
    paddingTop: 12,
    flexGrow: 1,
    //flexDirection: 'column',
    flexWrap: 'wrap',
  },
  itemContainer: {
    padding: 2,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  nameItemText: {
    fontSize: 15,
    transform: 'rotate(2deg)',
    //paddingLeft: 1,
    //paddingRight: 1,
    padding: 2,
    borderTopLeftRadius: '5%',
    borderTopRightRadius: '20%',
    borderBottomLeftRadius: '25%',
    borderBottomLeftRadius: '20%',
    //backgroundColor: '#fdcb6e',
    //alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  studentsTextTitle: {
    fontSize: 30,
    fontFamily: 'Marker Felt',
  },
  item: {
    width: '40%',
  },
  flatListContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-around',
    minWidth: 120, // Control the minimum width of each item
    flexDirection: 'row',
    margin: 8,
  },
  nameItem: {
    //flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  row: {
    // flexDirection: 'column', // Two columns in each row
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
    headerContainer: {
    padding: 5,
    paddingRight: 10,
    alignItems:'center',
    justifyContent:'center'    
  }
});

export default OrderedNameListTestPage;
