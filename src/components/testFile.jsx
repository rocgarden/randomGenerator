import React from 'react';
import { View, Text,   Button, FlatList, StyleSheet} from 'react-native';

import { SafeAreaView } from 'react-native';

const TestPage = ({ navigation , route }) => {
 const handleNavigate = () => {
   navigation.navigate('NamesList');
 };
  console.log("STATE:: ", route.params.state);
  const state = route.params.state;
  const renderItem = ({item}) => (
    <View>
      <Text>{item}</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: 'red',
        }}>
        <Text>Welcome to the TEST Page</Text>
      </View>
      <Button title="Go to Home page" onPress={handleNavigate} />

      <View style={{backgroundColor: 'blue', marginTop: 45, alignContent:'center', alignItems:'center'}}>
        <Text style={{fontSize: 30}}>Shuffled Names </Text>
        {state.length > 0 && state !== 'undefined' ? (
          <FlatList
            data={state}
            keyExtractor={({item}, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text>No shuffled names. {state} </Text>
        )}
      
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
 
  item: {
    flex: 1,
    padding: 2,
    fontSize: 25,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

export default TestPage;

