import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
const OrderedNameList = ({names, handleDeleteName,}) => {

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
      <View style={styles.item}>
        <FlatList
          data={names}
          renderItem={renderItem}
          keyExtractor={({item}, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex:1,
    //textAlign: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    //backgroundColor: 'red',
    padding: 8,
    height: '55%',
    paddingTop: 12,
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  itemContainer: {
    padding: 2,
  },
  nameItemText: {
    width:'100%',
    fontSize: 18,
    padding: 7,
    //paddingLeft:7,
    borderRadius:20,
    // borderTopLeftRadius: '5%',
    // borderTopRightRadius: '20%',
    // borderBottomLeftRadius: '25%',
    // borderBottomLeftRadius: '20%',
    backgroundColor: '#FFEAA7',
  },
  item: {
    width: '100%',
  },
});

export default OrderedNameList;