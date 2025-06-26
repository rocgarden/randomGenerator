import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const OrderedNameList = ({ names, handleDeleteName }) => {
  const flatListRef = useRef();

  // Scroll to end when names change
  useEffect(() => {
    if (flatListRef.current && names.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [names]);

const renderItem = ({item, index}) => {
  const backgroundColors = [
    '#ffeaa7',
    '#81ecec',
    '#fab1a0',
    '#a29bfe',
    '#fd79a8',
    '#74b9ff',
    '#55efc4',
  ]; // You can add more
  const backgroundColor = backgroundColors[index % backgroundColors.length];

  return (
    <Pressable onPress={() => handleDeleteName(item)}>
      <View style={styles.itemContainer}>
        <Text style={[styles.nameItemText, {backgroundColor}]}>
          {index + 1}. {item}
        </Text>
      </View>
    </Pressable>
  );
};

  
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <FlatList
          ref={flatListRef}
          data={names}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
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
    fontSize: 18,
    padding: 10,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: '#d6c8ff',
    fontFamily: 'Marker Felt',
    // backgroundColor: '#fdcb6e',
    color: '#2d3436',
    fontWeight: '600',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 4,
    elevation: 3,
    textAlign: 'center',
  },
  item: {
    width: '100%',
    //textAlign: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default OrderedNameList;
