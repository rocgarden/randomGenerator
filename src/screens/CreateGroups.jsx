// 📄 app/screens/CreateGroups.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useNameList} from '../context/NamesListContext';
import StartOverButton from '../components/StartOverButton';
import ScreenWrapper from '../components/ScreenWrapper';

const CreateGroups = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const {
    state,
    handleCreateGroups,
    handleShuffleNames,
    handleSetGroupNames,
    groupCount,
    setGroupCount,
    groupNames,
    setGroupNames,
  } = useNameList();

  useEffect(() => {
    // Reset group inputs when entering the screen
    setGroupNames([]);
    setGroupCount(0);
  }, []);

  const addGroup = () => {
    const updated = [...groupNames, ''];
    setGroupNames(updated);
    setGroupCount(updated.length);
  };

  const handleGroupNameChange = (index, name) => {
    const updatedNames = [...groupNames];
    updatedNames[index] = name;
    setGroupNames(updatedNames);
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
            const updated = [...groupNames];
            updated.splice(index, 1);
            setGroupNames(updated);
            setGroupCount(updated.length);
          },
        },
      ],
    );
  };

  const handleCreateGroupsClick = () => {
    if (
      groupNames.length === 0 ||
      groupNames.some(name => name.trim() === '')
    ) {
      Alert.alert('Please add and fill in all group names.');
      return;
    }
    handleShuffleNames();
    handleSetGroupNames(groupNames);
    handleCreateGroups();
    setModalVisible(true);
  };

  if (!state.names.length) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={styles.sectionEmoji}>🚫 No names available</Text>
        <Text>Add some players to start creating groups.</Text>
        <StartOverButton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionEmoji}>🧑‍🤝‍🧑 Create Groups</Text>
      <ScreenWrapper>
        {groupNames.map((name, index) => (
          <View key={index} style={styles.groupInputRow}>
            <TextInput
              value={name}
              onChangeText={text => handleGroupNameChange(index, text)}
              style={styles.groupInput}
              placeholder="Group name"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => handleDeleteGroup(index)}>
              <Text style={styles.buttonText}>✖️</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={addGroup} style={styles.addBox}>
          <Text style={styles.addBoxText}>➕ Add Group</Text>
        </TouchableOpacity>
      </ScreenWrapper>
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
      <View style={styles.adPlaceholder} />

      {/* Modal: Show group results */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Text style={styles.modalTitle}>📋 Groups</Text>
          <FlatList
            data={state.groups}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <Text style={styles.groupNameTitle}>
                  {state.groupNames[index] || `Group ${index + 1}`}
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
              <Text style={styles.buttonText}>✖️ Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  sectionEmoji: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Marker Felt',
    color: '#6f42c1',
  },
  groupInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
    fontFamily: 'Marker Felt',
  },
  addBox: {
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  addBoxText: {
    fontSize: 16,
    color: '#6f42c1',
    fontFamily: 'Marker Felt',
  },
  divider: {
    height: 1,
    backgroundColor: '#dfe6e9',
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#6f42c1',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Marker Felt',
    color: '#6f42c1',
  },
  modalBackdrop: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalTitle: {
    color: '#fff',
    fontFamily: 'Marker Felt',
    fontSize: 24,
    textAlign: 'center',
    marginTop:30,
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: '#eee',
  },
  groupNameTitle: {
    fontSize: 18,
    fontFamily: 'Marker Felt',
    color: '#fff',
    marginBottom: 5,
  },
  eachName: {
    fontSize: 16,
    color: '#dfe6e9',
  },
  adPlaceholder: {
    width: '100%',
    height: 60,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default CreateGroups;
