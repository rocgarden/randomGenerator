import React from 'react';
import { useEffect, useState } from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  TextInput, Alert,
  TouchableOpacity
  } from 'react-native';
import { useNameList } from './NamesListContext';
import { useNavigation } from '@react-navigation/native';
const CreateGroups = ({ shuffledNames}) => {
    const {
      handleCreateGroups,
      state,
      handleSetGroupNames,
      groupCount,
      setGroupCount,
      groupNames,
      setGroupNames,
      handleShuffleNames,
    } = useNameList();

  const navigation = useNavigation();
 useEffect(() => {
    console.log(state.names)
   if (groupCount > 0) {
     setGroupNames(new Array(groupCount).fill('')); // Initialize empty names
   }
 }, [groupCount]);

 const handleGroupNameChange = (index, name) => {
   const updatedNames = [...groupNames];
   updatedNames[index] = name;
   setGroupNames(updatedNames);
 };

 const handleNumberOfGroupsChange = (value) => {
   setGroupCount(Number(value));
 };

const handleCreateGroupsClick = () => {
        if (groupNames.some(name => name === '')) {
          Alert.alert('Please fill in all group names.');
          return;
    };
        handleShuffleNames();
        handleSetGroupNames(groupNames); // Set custom group names in the context
        handleCreateGroups(); // Create the groups and distribute names
        console.log('STATE:: ', state);      
};  
    //create groups display based on number of groups entered
      const minCols = 2;

      const calcNumColumns = width => {
        const cols = width / styles.item.width;
        const colsFloor =
          Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
        const colsMinusMargin = cols - 2 * colsFloor * styles.item.margin;
        if (colsMinusMargin < colsFloor && colsFloor > minCols) {
          return colsFloor - 1;
        } else return colsFloor;
      };
     const {width} = styles.container.width
     const [numColumns, setNumColumns] = useState(calcNumColumns(width));

     useEffect(() => {
       setNumColumns(calcNumColumns(width));
     }, [width]);

    return (
      <View style={{padding: 20}}>
        <Text>Enter the number of groups:</Text>
        <TextInput
          value={String(groupCount)}
          onChangeText={handleNumberOfGroupsChange}
          keyboardType="numeric"
          style={{borderWidth: 1, padding: 5, marginBottom: 10}}
        />
        {groupCount > 0 && (
          <View>
            {groupNames.map((name, index) => (
              <View key={index} style={{marginBottom: 10}}>
                <Text>Enter name for Group {index + 1}:</Text>
                <TextInput
                  value={name}
                  onChangeText={text => handleGroupNameChange(index, text)}
                  style={{borderWidth: 1, padding: 5}}
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateGroupsClick}
                //disabled={isDisabled}
              >
                <Text style={styles.buttonText}>Groups</Text>
              </TouchableOpacity>
            </View>
            
            {/* <Button title="Create Groups" onPress={handleCreateGroupsClick} /> */}
          </View>
        )}
        {state.groups.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.groupNameTitle}>Groups:</Text>
            <FlatList
              data={state.groups}
              renderItem={({item, index}) => (
                <View style={styles.item}>
                  <Text style={styles.groupNameTitle}>
                    {state.groupNames[index]}:
                  </Text>
                  {item.map((name, idx) => (
                    <Text key={idx}>{name}</Text>
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            //disabled={isDisabled}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

// Styling for the CreateGroups component
const styles = {
  container: {
    width: '100%',
    marginBottom: '20px',
  },
  groupNameTitle: {
    fontFamily: 'Marker Felt',
  },
  item: {
    // transform: 'rotate(2deg)',
    // paddingLeft: 5,
    // paddingRight: 5,
    // padding: 8,
    // borderTopLeftRadius: '5%',
    // borderTopRightRadius: '20%',
    // borderBottomLeftRadius: '25%',
    // borderBottomLeftRadius: '20%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    height: 'auto',
    padding: 3,
    marginBottom: 5,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Marker Felt',
    fontSize: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonContainer: {
    margin: 5,
    height: 'auto',
    padding: 5
  },
  button: {
    height: 'auto',
    width: '100%',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
  },
};

export default CreateGroups;

   










//  const handleCreateGroupsClick = () => {
//     if (groupCount > 0 && state.names.length >= groupCount) {
//       //first shuffle the names
//       //handleShuffleNames();
//       handleSetGroupNames(); // Set custom group names in the context

//       //then create the groups based on the shuffled names
//       handleCreateGroups(groupCount);
//     } else {
//       alert(
//         "Please enter a valid group count or ensure you have enough names."
//       );
//     }
//   };
    