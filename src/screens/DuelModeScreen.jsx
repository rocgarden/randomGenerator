import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {useNameList} from '../context/NamesListContext';
import { characterRoles } from '../data/roles';
import { getRandomDuelers, getRandomRoles } from '../utils/gameEngine';
import {shuffleArray} from '../utils/gameEngine';
import StartOverButton from '../components/StartOverButton';
import ScreenWrapper from '../components/ScreenWrapper';

const DuelModeScreen = () => {
  const {state} = useNameList();
  const [duelers, setDuelers] = useState([]);
  const [dueler1, dueler2] = getRandomDuelers(state.names);
  const [role1, role2] = getRandomRoles(characterRoles);

 
  const pickNewDuelers = () => {
    if (state.names.length < 2) {
      setDuelers([]);
      return;
    }

    const [dueler1, dueler2] = getRandomDuelers(state.names);
    const [role1, role2] = getRandomRoles(characterRoles);

    setDuelers([
      {name: dueler1, role: role1},
      {name: dueler2, role: role2},
    ]);
  };

  useEffect(() => {
    pickNewDuelers();
  }, [state.names]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⚔️ Duel Mode</Text>
      <View style={styles.sceneStarterBox}>
        <Text style={styles.sceneStarterText}>
          Pair up against another ramdomly assigned player role.
        </Text>
      </View>

      <ScreenWrapper>
        {duelers.length < 2 ? (
          <Text style={styles.warning}>
            Add at least 2 names to start a duel!
          </Text>
        ) : (
          <View style={styles.cardContainer}>
            {duelers.map((dueler, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.name}>{dueler.name}</Text>
                <Text style={styles.role}>{dueler.role}</Text>
              </View>
            ))}
          </View>
        )}
      </ScreenWrapper>
      <TouchableOpacity style={styles.button} onPress={pickNewDuelers}>
        <Text style={styles.buttonText}>🔄 New Duel</Text>
      </TouchableOpacity>
      <StartOverButton />
      {/* Future banner ad placeholder */}
      <View style={styles.adPlaceholder}></View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 24,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#6f42c1',
    fontWeight: '700',
    marginBottom: 30,
    fontFamily: 'Marker Felt',
    paddingTop: 50,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 50,
  },
  card: {
    width: width * 0.4,
    padding: 36,
    backgroundColor: '#ffeaa7',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6f42c1',
    marginBottom: 10,
  },
  role: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6f42c1',
  },
  buttonText: {
    color: '#6f42c1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  warning: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
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
});

export default DuelModeScreen;
