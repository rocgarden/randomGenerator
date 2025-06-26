import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNameList } from '../context/NamesListContext';
import { characterRolesByCategory } from '../data/roles';
import StartOverButton from '../components/StartOverButton';
import { shuffleArray } from '../utils/gameEngine';
import RoleCard from '../components/RoleCard';
import { getColorForRole } from '../utils/cardColor';
import ScreenWrapper from '../components/ScreenWrapper';

const CATEGORY_OPTIONS = Object.keys(characterRolesByCategory).concat(
  'User Defined',
  'Random Mashup'
);

const AssignCharactersScreen = () => {
  const { state } = useNameList();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [customRoles, setCustomRoles] = useState(['']);

  const countDuplicates = (index, length) =>
    index >= length ? Math.floor(index / length) + 1 : '';

  const assignRoles = (_, rolesSource) => {
    if (!state.names.length || !rolesSource.length) {
      Alert.alert('Missing players or roles!');
      return;
    }

    const shuffledNames = shuffleArray(state.names);
    const shuffledRoles = shuffleArray(rolesSource);

    const paired = shuffledNames.map((name, index) => ({
      name,
      role:
        shuffledRoles[index % shuffledRoles.length] +
        (countDuplicates(index, shuffledRoles.length) || ''),
    }));

    setAssignments(paired);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setAssignments([]);
    setCustomRoles(['']);

    if (category !== 'User Defined') {
      const rolesPool =
        category === 'Random Mashup'
          ? Object.values(characterRolesByCategory).flat()
          : characterRolesByCategory[category] || [];

      assignRoles(category, rolesPool);
    }
  };

  const handleAddCustomRole = () => {
    setCustomRoles([...customRoles, '']);
  };

  const handleCustomRoleChange = (index, text) => {
    const updated = [...customRoles];
    updated[index] = text;
    setCustomRoles(updated);
  };

  const handleAssignCustomRoles = () => {
    const filtered = customRoles.filter((r) => r.trim() !== '');
    if (!filtered.length) {
      Alert.alert('Please enter at least one custom role.');
      return;
    }
    assignRoles('User Defined', filtered);
  };

  const handleShuffleAgain = () => {
    if (selectedCategory === 'User Defined') {
      setAssignments([]);
    } else {
      handleCategorySelect(selectedCategory);
    }
  };

  const renderAssignment = ({item}) => (
    <View style={styles.card}>
      {/* <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text> */}
      <RoleCard
        name={item.name}
        role={item.role}
        backgroundColor={getColorForRole(
          typeof item.role === 'string' ? item.role : item.role.name,
        )}
      />
    </View>
  );

  const renderCategoryButtons = () => (
    <View style={styles.buttonGrid}>
      {CATEGORY_OPTIONS.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryButton,
            selectedCategory === cat && styles.activeButton,
          ]}
          onPress={() => handleCategorySelect(cat)}
        >
          <Text style={styles.buttonText}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCustomInputFields = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.customInputSection}>
        <Text style={styles.subHeader}>Enter Custom Roles:</Text>
        {customRoles.map((role, index) => (
          <TextInput
            key={index}
            value={role}
            onChangeText={(text) => handleCustomRoleChange(index, text)}
            style={styles.input}
            placeholder={`Role ${index + 1}`}
          />
        ))}
        <TouchableOpacity onPress={handleAddCustomRole} style={styles.addBox}>
          <Text style={styles.addBoxText}>➕ Add Role</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAssignCustomRoles}
          style={styles.assignButton}
        >
          <Text style={styles.assignButtonText}>✅ Assign Roles</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenWrapper >
          {!selectedCategory ? (
            <>
              <Text style={styles.title}>🎭 Choose a Role Category</Text>
              {renderCategoryButtons()}
            </>
          ) : assignments.length ? (
            <>
              <Text style={styles.title}>🎲 Assigned Characters</Text>
              <Text style={styles.sceneSubtitle}> 👉🏻 {selectedCategory}</Text>
              <FlatList
                data={assignments}
                renderItem={renderAssignment}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.grid}
              />
              <TouchableOpacity
                style={styles.shuffleButton}
                onPress={handleShuffleAgain}>
                <Text style={styles.shuffleButtonText}>🔁 Shuffle Again</Text>
              </TouchableOpacity>
            </>
          ) : selectedCategory === 'User Defined' ? (
            renderCustomInputFields()
          ) : (
            <Text style={styles.title}>No roles available</Text>
          )}
        </ScreenWrapper>
        <StartOverButton />

        {/* Future banner ad placeholder */}
        <View style={styles.adPlaceholder}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Marker Felt',
    textAlign: 'center',
    marginBottom: 16,
    color: '#6f42c1',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical:40,
    gap: 10,
  },
  categoryButton: {
    backgroundColor: '#d6c8ff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 6,
  },
  activeButton: {
    backgroundColor: '#a29bfe',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Marker Felt',
  },
  customInputSection: {
    padding: 10,
    paddingBottom: 40,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Marker Felt',
    marginBottom: 10,
  },
  sceneSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
  },
  addBox: {
    // backgroundColor: '#a29bfe',
    padding: 10,
    alignItems: 'flex-start',
    marginTop: 10,
    borderRadius: 20,
  },
  addBoxText: {
    color: '#a29bfe',
    fontWeight: 'bold',
  },
  assignButton: {
    backgroundColor: '#6c5ce7',
    padding: 12,
    marginTop: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flex: 1,
    aspectRatio: 1,
    // backgroundColor: '#d6c8ff',
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 12,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Marker Felt',
  },
  role: {
    fontSize: 16,
    marginTop: 4,
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 40,
  },
  shuffleButton: {
    backgroundColor: '#6c5ce7',
    padding: 12,
    marginTop: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  shuffleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  adPlaceholder: {
    height: 60, // reserve space for banner ads like AdMob
    backgroundColor: '#fdfdfd',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default AssignCharactersScreen;
