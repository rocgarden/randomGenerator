import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {useNameList} from '../context/NamesListContext';
import {characterRoles} from '../data/roles';
import {icebreakerPrompts} from '../data/roles';
import {shuffleArray} from '../utils/gameEngine';
import StartOverButton from '../components/StartOverButton';
import ScreenWrapper from '../components/ScreenWrapper';
const IcebreakerModeScreen = () => {
  const {state} = useNameList();
  const [availableNames, setAvailableNames] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const pickNext = () => {
    if (availableNames.length === 0) {
      setCurrentCard(null);
      return;
    }

    const [nextName, ...rest] = availableNames;
    const randomRole = shuffleArray(characterRoles)[0];
    const randomPrompt = shuffleArray(icebreakerPrompts)[0];

    setCurrentCard({
      name: nextName,
      role: randomRole,
      prompt: randomPrompt,
    });

    setAvailableNames(rest);
  };

 useEffect(() => {
   if (state.names.length >= 1) {
     const shuffled = shuffleArray(state.names);
     setAvailableNames(shuffled);
    if (currentCard && !state.names.includes(currentCard.name)) {
    setCurrentCard(null);
    };
     // 🛡️ Guard against stale currentCard
     if (!shuffled.includes(currentCard?.name)) {
       setCurrentCard(null);
     }
   }
 }, [state.names]);


  return (
    <SafeAreaView style={styles.container}>
      <ScreenWrapper scrollable>
        {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
        <Text style={styles.title}>🧊 Icebreaker Mode</Text>

        <Text style={styles.instructions}>
          Each player gets a random role and fun question. Respond as your
          character!
        </Text>

        {state.names.length < 1 ? (
          <Text style={styles.warning}>Add at least 1 name to begin!</Text>
        ) : currentCard ? (
          <View style={styles.card}>
            <Text style={styles.name}>{currentCard.name}</Text>
            <Text style={styles.role}>🎭 Role: {currentCard.role}</Text>
            <Text style={styles.prompt}>❓ {currentCard.prompt}</Text>
          </View>
        ) : (
          <Text style={styles.doneText}>All players have gone!</Text>
        )}
        {/* </ScrollView> */}
      </ScreenWrapper>
      <TouchableOpacity
        style={[
          styles.button,
          (state.names.length < 1 || availableNames.length === 0) &&
            styles.buttonDisabled,
        ]}
        onPress={pickNext}
        disabled={state.names.length < 1 || availableNames.length === 0}>
        <Text style={styles.buttonText}>
          {currentCard ? '▶️ Next Player' : '🎬 Start'}
        </Text>
      </TouchableOpacity>

      <StartOverButton />

      <View style={styles.adPlaceholder} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    //  alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  scrollContainer: {
    paddingBottom: 100, // Make room for buttons & ad
  },

  title: {
    fontSize: 28,
    color: '#6f42c1',
    fontWeight: '700',
    fontFamily: 'Marker Felt',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#a29bfe',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffeaa7',
    borderRadius: 16,
    padding: 30,
    // width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    marginVertical: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6f42c1',
    marginBottom: 10,
    fontFamily: 'Marker Felt',
  },
  role: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  prompt: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  warning: {
    fontSize: 16,
    color: '#fff3cd',
    backgroundColor: '#a29bfe',
    padding: 10,
    borderRadius: 8,
    marginVertical: 12,
  },
  doneText: {
    fontSize: 18,
    color: '#fd79a8',
    marginVertical: 12,
    textAlign: 'center',
  },
  button: {
    height: 'auto',
    width: '100%',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#6f42c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#6f42c1',
    fontWeight: 'bold',
    fontSize: 16,
    //fontFamily: 'Marker Felt',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#999',
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

export default IcebreakerModeScreen;
