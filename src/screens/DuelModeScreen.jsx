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
import { getColorForRole } from '../utils/cardColor';
import RoleCard from '../components/RoleCard';
const DuelModeScreen = () => {
  const {state} = useNameList();
  const [duelers, setDuelers] = useState([]);

 
  const pickNewDuelers = () => {
    if (state.names.length < 2) {
      setDuelers([]);
      return;
    }

    const [dueler1, dueler2] = getRandomDuelers(state.names);
    const [role1, role2] = getRandomRoles(characterRoles);

    // ensure roles are full objects, not strings
  setDuelers([
    {name: dueler1, role: role1},
    {name: dueler2, role: role2},
  ]);

  };

  console.log("duelrs::", duelers);
  useEffect(() => {
    pickNewDuelers();
  }, [state.names]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⚔️ Duel Mode</Text>
      <View style={styles.sceneStarterBox}>
        <Text style={styles.sceneStarterText}>
          Pair up against another randomly assigned player role.
        </Text>
      </View>

      <ScreenWrapper scrollable>
        {duelers.length < 2 ? (
          <Text style={styles.warning}>
            Add at least 2 names to start a duel!
          </Text>
        ) : (
          <View style={styles.cardContainer}>
            {duelers.map((dueler, index) => (
              // <View
              //   key={index}
              //   style={styles.card}>
              //   <Text style={styles.name}>{dueler.name}</Text>
              //   <Text
              //     style={styles.role}>
              //     {dueler.role}
              //   </Text>
              // </View>
              <RoleCard
                key={index}
                name={dueler.name}
                role={dueler.role}
                backgroundColor={getColorForRole(dueler.role || '')}
                // backgroundColor={getColorForRole(
                //   typeof dueler.role === 'string'
                //     ? dueler.role
                //     : dueler.role.name,
                // )}
              />
              
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
    //padding: 13,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    color: '#6f42c1',
    fontWeight: '700',
    marginBottom: 30,
    fontFamily: 'Marker Felt',
    paddingTop: 10,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    paddingBottom:10
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
