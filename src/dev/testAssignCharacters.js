import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNameList} from '../context/NamesListContext';
import {characterRoles} from '../data/roles'; // e.g. { Fantasy: [...], Modern: [...], etc. }
import {shuffleArray} from '../utils/gameEngine';
import StartOverButton from '../components/StartOverButton';

const AssignCharactersScreen = () => {
  const {state} = useNameList();
  const [category, setCategory] = useState('Fantasy');
  const [assignments, setAssignments] = useState([]);
  const [customRoles, setCustomRoles] = useState(['']);
  const [allCategories, setAllCategories] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    const loadCustomRoles = async () => {
      const saved = await AsyncStorage.getItem('customRoles');
      if (saved) {
        setCustomRoles(JSON.parse(saved));
      }
    };
    loadCustomRoles();
  }, []);

  useEffect(() => {
    const cats = Object.keys(characterRoles);
    setAllCategories([...cats, 'User Defined', 'Mashup']);
  }, []);

  useEffect(() => {
    if (category === 'User Defined') {
      setAvailableRoles(customRoles.filter(role => role.trim()));
    } else if (category === 'Mashup') {
      // flatten all role arrays
      const all = Object.values(characterRoles).flat();
      setAvailableRoles(all);
    } else {
      setAvailableRoles(characterRoles[category] || []);
    }
  }, [category, customRoles]);

  const assignRoles = () => {
    const shuffledNames = shuffleArray(state.names);
    const shuffledRoles = shuffleArray(availableRoles);

    const roleCounts = {}; // For duplicate tracking
    const assigned = shuffledNames.map((name, index) => {
      let role = shuffledRoles[index % shuffledRoles.length];
      if (!roleCounts[role]) {
        roleCounts[role] = 1;
      } else {
        roleCounts[role]++;
        role = `${role}${roleCounts[role]}`;
      }
      return {name, role};
    });

    setAssignments(assigned);
  };

  useEffect(() => {
    if (state.names.length && availableRoles.length) {
      assignRoles();
    }
  }, [state.names, availableRoles]);

  const handleCustomRoleChange = (text, index) => {
    const updated = [...customRoles];
    updated[index] = text;
    setCustomRoles(updated);
    AsyncStorage.setItem('customRoles', JSON.stringify(updated));
  };

  const addCustomRole = () => {
    setCustomRoles([...customRoles, '']);
  };

  const clearCustomRoles = () => {
    AsyncStorage.removeItem('customRoles');
    setCustomRoles(['']);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Assign Characters</Text>

      {/* Category Selection */}
      <View style={styles.categoryPicker}>
        {allCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.categorySelected,
            ]}
            onPress={() => setCategory(cat)}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Roles Input */}
      {category === 'User Defined' && (
        <View style={styles.customRolesSection}>
          <Text style={styles.subtitle}>Your Roles:</Text>
          {customRoles.map((role, index) => (
            <TextInput
              key={index}
              value={role}
              onChangeText={text => handleCustomRoleChange(text, index)}
              style={styles.input}
              placeholder={`Role ${index + 1}`}
              placeholderTextColor="#999"
            />
          ))}
          <View style={styles.customButtons}>
            <TouchableOpacity onPress={addCustomRole}>
              <Text style={styles.addRole}>➕ Add Role</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearCustomRoles}>
              <Text style={styles.clear}>🧹 Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Shuffle Again Button */}
      <TouchableOpacity style={styles.shuffleButton} onPress={assignRoles}>
        <Text style={styles.shuffleButtonText}>🔀 Shuffle Again</Text>
      </TouchableOpacity>

      {/* Assignments */}
      <FlatList
        data={assignments}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
        )}
        contentContainerStyle={{paddingBottom: 80}}
      />

      <StartOverButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4eeff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Marker Felt',
    textAlign: 'center',
    marginVertical: 10,
  },
  categoryPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#dcd6f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
  },
  categorySelected: {
    backgroundColor: '#a6b1e1',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Marker Felt',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: 'System',
  },
  customRolesSection: {
    marginVertical: 10,
    paddingBottom: 10,
  },
  customButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addRole: {
    color: '#18dcff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clear: {
    color: '#ff7675',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shuffleButton: {
    backgroundColor: '#a6b1e1',
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  shuffleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Marker Felt',
  },
  card: {
    backgroundColor: '#d6c8ff',
    margin: 6,
    flex: 0.48,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Marker Felt',
  },
  role: {
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default AssignCharactersScreen;
