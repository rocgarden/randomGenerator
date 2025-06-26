import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNameList} from '../context/NamesListContext';
import {useNavigation} from '@react-navigation/native';
import StartOverButton from '../components/StartOverButton';

const CreateGroups = ({shuffledNames}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [showInputs, setShowInputs] = useState(true);
  const showGroupInputs = groupCount > 0 && state.groups.length === 0;

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

  //  useEffect(() => {
  //     console.log(state.names)
  //    if (groupCount > 0) {
  //      setGroupNames(new Array(groupCount).fill('')); // Initialize empty names
  //    }
  //  }, [groupCount]);
  useEffect(() => {
    // Clear group names and count when entering the screen
    setGroupNames([]);
    setGroupCount(0);
  }, []);

  // Add group input
  const addGroup = () => {
    const updated = [...groupNames, ''];
    setGroupNames(updated);
    setGroupCount(updated.length); // 👈 ensure groupCount stays in sync
  };

  const handleGroupNameChange = (index, name) => {
    const updatedNames = [...groupNames];
    updatedNames[index] = name;
    setGroupNames(updatedNames);
  };

  const handleNumberOfGroupsChange = value => {
    setGroupCount(Number(value));
  };

  const handleCreateGroupsClick = () => {
    // if (groupNames.some(name => name === '')) {
    //   Alert.alert('Please fill in all group names.');
    //   return;
    // }
    if (
      groupNames.length === 0 ||
      groupNames.some(name => name.trim() === '')
    ) {
      Alert.alert('Please add and fill in all group names.');
      return;
    }
    handleShuffleNames();
    handleSetGroupNames(groupNames); // Set custom group names in the context
    handleCreateGroups(); // Create the groups and distribute names
    setModalVisible(true); // Show modal with groups
  };

  const handleDeleteGroup = index => {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to delete group "${groupNames[index]}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedNames = [...groupNames];
            updatedNames.splice(index, 1);
            setGroupNames(updatedNames);
            setGroupCount(updatedNames.length); // 👈 again, sync with groupCount
          },
        },
      ],
    );
  };

  //CREATE groups display based on number of groups entered
  //   const minCols = 2;

  //   const calcNumColumns = width => {
  //     const cols = width / styles.item.width;
  //     const colsFloor =
  //       Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  //     const colsMinusMargin = cols - 2 * colsFloor * styles.item.margin;
  //     if (colsMinusMargin < colsFloor && colsFloor > minCols) {
  //       return colsFloor - 1;
  //     } else return colsFloor;
  //   };
  //  const {width} = styles.container.width
  //  const [numColumns, setNumColumns] = useState(calcNumColumns(width));

  //  useEffect(() => {
  //    setNumColumns(calcNumColumns(width));
  //  }, [width]);

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#f4eeff'}}>
      <View
        style={{
          backgroundColor: '#fafafa',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: {width: 2, height: 2},
          elevation: 4,
          borderRadius: 8,
        }}>
        <Text style={styles.sectionEmoji}>🧑‍🤝‍🧑 Create Groups</Text>

        {groupNames.map((name, index) => (
          <View key={index} style={styles.groupInputRow}>
            {/* <Text style={styles.groupLabel}>Group :</Text> */}
            <TextInput
              value={name}
              onChangeText={text => handleGroupNameChange(index, text)}
              style={styles.groupInput}
              placeholder="Group name"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => handleDeleteGroup(index)}>
              <Text style={styles.buttonText}> X </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={addGroup} style={styles.addBox}>
          <Text style={styles.addBoxText}>➕ Add Group</Text>
        </TouchableOpacity>
      </View>
      {/* ____________________________-------------------------- */}

      {/* <Text>Enter the number of groups:</Text>
      <TextInput
        value={String(groupCount)}
        onChangeText={handleNumberOfGroupsChange}
        keyboardType="numeric"
        style={styles.input}
      /> */}
      {/* <TouchableOpacity onPress={() => setShowInputs(prev => !prev)}>
          <Text style={styles.groupNameTitle}>
            {showInputs ? '🔽 Hide' : '🔼 Show'} Group Inputs
          </Text>
        </TouchableOpacity> */}
      {/* ____________________________-------------------------- */}
      {/* {groupCount > 0 && (
        <View>
          {groupNames.map((name, index) => (
            <View key={index} style={styles.groupInputRow}>
              <Text style={styles.groupLabel}>Group {index + 1}:</Text>
              <TextInput
                value={name}
                onChangeText={text => handleGroupNameChange(index, text)}
                style={styles.groupInput}
              />
            </View>
          ))}
        </View>
      )} */}
      {/* {state.groups.length > 0 && (
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
        )} */}
      {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            //disabled={isDisabled}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View> */}

      <View style={styles.divider} />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateGroupsClick}>
          <Text style={styles.buttonText}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      <StartOverButton />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {/* <View style={styles.modal}> */}
        <View
          style={{
            flex: 1,
            padding: 70,
            marginVertical: 40,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Marker Felt',
              fontSize: 25,
              textAlign: 'center',
              padding: 10,
            }}>
            Groups{' '}
          </Text>
          <FlatList
            data={state.groups}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <Text style={styles.groupNameTitle}>
                  Group {state.groupNames[index]}:
                </Text>
                {item.map((name, idx) => (
                  <Text style={styles.eachName} key={idx}>
                    {name}
                  </Text>
                ))}
              </View>
            )}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>X Close</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
};

// Styling for the CreateGroups component
const styles = {
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    width: '100%',
  },
  input: {
    borderWidth: 2,
    //borderColor: '#fdcb6e',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Marker Felt',
  },

  groupNameTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#eeeeee',
    marginVertical: 5,
    fontFamily: 'Marker Felt',
  },
  item: {
    backgroundColor: '#7971ea',
    padding: 3,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#eeeeee',
  },
  buttonContainer: {
    margin: 5,
    height: 'auto',
    padding: 5,
  },
  groupInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
  },

  groupLabel: {
    fontSize: 16,
    fontFamily: 'Marker Felt',
    color: '#2d3436',
    width: 100,
  },

  groupInput: {
    flex: 1,
    borderWidth: 1,
    //borderColor: '#fdcb6e',
    borderRadius: 8,
    padding: 6,
    fontSize: 16,
    backgroundColor: '#fff',
    borderStyle: 'solid',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10, // if using RN 0.71+, otherwise use marginRight
  },

  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#6f42c1',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Marker Felt',
    // color: '#fff',
    color: '#6f42c1',
  },
  divider: {
    height: 1,
    backgroundColor: '#dfe6e9',
    marginVertical: 10,
    width: '100%',
  },

  sectionEmoji: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'Marker Felt', // or another playful font
  },
  eachName: {
    fontSize: 16,
    color: '#eeeeee',
  },
  addBox: {
    marginVertical: 5,
  },
  addBoxText: {
    fontSize: 14,
    color: '#6f42c1',
    fontFamily: 'Marker Felt',
    paddingHorizontal: 5,
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
