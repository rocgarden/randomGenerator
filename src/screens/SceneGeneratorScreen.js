import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNameList} from '../context/NamesListContext';
import {sceneData} from '../data/scenes';
import StartOverButton from '../components/StartOverButton';
import RoleCard from '../components/RoleCard';
import { getColorForRole } from '../utils/cardColor';
import ScreenWrapper from '../components/ScreenWrapper';
import { generateSceneAssignments } from '../utils/gameEngine';

const numColumns = 2;
const cardSize = Dimensions.get('window').width / 2 - 30;

const SceneGeneratorScreen = () => {
  const {state} = useNameList();
  const [selectedScene, setSelectedScene] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showStarter, setShowStarter] = useState(false);


useEffect(() => {
  if (!state.names.length || selectedScene) return;
  const {scene, assignments} = generateSceneAssignments(state.names, sceneData);
  setSelectedScene(scene);
  setAssignments(assignments);
}, [state.names, selectedScene]);

  const shuffleScene = () => {
    const {scene, assignments} = generateSceneAssignments(
      state.names,
      sceneData,
    );
    setSelectedScene(scene);
    setAssignments(assignments);
    setShowStarter(false);
  };

  const openRoleModal = role => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  if (!selectedScene) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No players found</Text>
        <Text>Add some names to get started!</Text>
      </SafeAreaView>
    );
  }

  const sceneDescription = `${
    selectedScene.category
  } — Roles: ${selectedScene.roles.map(r => r.name).join(', ')}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      <ScreenWrapper scrollable>
        <Text style={styles.sceneTitle}>Scene: {selectedScene.title}</Text>
        <Text style={styles.sceneSubtitle}>⚡️ {sceneDescription}</Text>
        <TouchableOpacity onPress={() => setShowStarter(!showStarter)}>
          <Text style={styles.sceneStarterToggle}>
            {showStarter ? 'Hide Scene Starter ▲' : 'Show Scene Starter ▼'}
          </Text>
        </TouchableOpacity>
        {showStarter && (
          <View style={styles.sceneStarterBox}>
            <Text style={styles.sceneStarterText}>
              {selectedScene.sceneStarter}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={shuffleScene} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>🔁 New Scene</Text>
        </TouchableOpacity>

        <FlatList
          scrollEnabled={false} // <--added property for warning
          data={assignments}
          numColumns={numColumns}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.grid}
          renderItem={({item}) => (
            // <TouchableOpacity
            //   style={styles.card}
            //   onPress={() => openRoleModal(item.role)}>
            //   <Text style={styles.name}>{item.name}</Text>
            //   <Text style={styles.icon}>{item.role.icon}</Text>
            //   <Text
            //     numberOfLines={2}
            //     ellipsizeMode="tail"
            //     style={styles.roleName}>
            //     {item.role.name}
            //   </Text>
            // </TouchableOpacity>
            <RoleCard
              name={item.name}
              role={item.role}
              // onPress={() => openRoleModal(item.role)}
              backgroundColor={getColorForRole(item.role.name)}
            />
          )}
        />

        {/* </ScrollView> */}
      </ScreenWrapper>
      <StartOverButton />
      <View style={styles.adPlaceholder}>
        <Text style={{color: '#aaa'}}>Ad Placeholder</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 16,
    paddingTop: 24,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sceneTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Marker Felt',
    color: '#6f42c1',
    margin: 5,
  },
  sceneSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
    fontStyle: 'italic',
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 80, // space for button and ad
  },
  card: {
    backgroundColor: '#a6b1e1',
    margin: 8,
    borderRadius: 12,
    width: cardSize,
    height: cardSize,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Marker Felt',
    marginBottom: 6,
    color: '#2d3436',
  },
  icon: {
    fontSize: 30,
    marginBottom: 6,
  },
  roleName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2d3436',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalClose: {
    fontSize: 16,
    color: '#18dcff',
    fontWeight: 'bold',
  },
  adPlaceholder: {
    height: 60,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  sceneStarterToggle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c5ce7',
    marginBottom: 8,
    fontWeight: '600',
  },
  sceneStarterBox: {
    backgroundColor: '#f0e6ff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 16,
    elevation: 1,
  },
  sceneStarterText: {
    fontSize: 14,
    color: '#2d3436',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#fff',
    borderColor: '#6f42c1',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  refreshButtonText: {
    color: '#6f42c1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SceneGeneratorScreen;
