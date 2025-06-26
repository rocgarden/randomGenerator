// screens/GameModeSelectScreen.js
import React from 'react';
import {View, Text, SafeAreaView,ScrollView, StyleSheet, Image} from 'react-native';
import { useNameList } from '../context/NamesListContext';
import GameModeButton from '../components/GameModeButton';
import stage from '../assets/images/stage.jpg';
import quickAssign from '../assets/images/logoFrame.png';

const GameModeSelectScreen = ({ navigation }) => {
  const { setGameMode } = useNameList();

  const handleSelect = (gameMode) => {
    setGameMode(gameMode);
    navigation.navigate('PlayerSetup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={quickAssign} style={styles.logo} />

        <Text style={styles.tagline}>Set Roles.Set scenes.Set Teams.</Text>

        <View style={styles.buttonGrid}>
          <GameModeButton
            emoji="🎭"
            label="Set Characters"
            imageSource={stage}
            onPress={() => handleSelect('assignCharacters')}
          />
          <GameModeButton
            emoji="🎬"
            label="Set Scenes"
            imageSource={stage}
            onPress={() => handleSelect('sceneGenerator')}
          />
          <GameModeButton
            emoji="👥"
            label="Duel Off"
            imageSource={stage}
            onPress={() => handleSelect('duelOff')}
          />
          <GameModeButton
            emoji="❄️"
            label="Ice Breakers Roles"
            imageSource={stage}
            onPress={() => handleSelect('icebreakers')}
          />
          <GameModeButton
            emoji="🔀"
            label="Shuffle Names"
            imageSource={stage}
            onPress={() => handleSelect('shuffleNames')}
          />
          <GameModeButton
            emoji="🧑‍🤝‍🧑"
            label="Create Groups"
            imageSource={stage}
            onPress={() => handleSelect('createGroups')}
          />
        </View>

        {/* Reserved space for banner ads */}
        <View style={styles.adPlaceholder}>
          {/* In future: <BannerAd /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6f42c1',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#6f42c1',
  },
  logo: {
    width: 145, //120
    height: 145, //120
    resizeMode: 'contain',
    marginBottom: 15,
  },
  tagline: {
    fontSize: 18,
    color: '#eeeeee',
    fontWeight: '200',
    marginBottom: 30,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  adPlaceholder: {
    height: 60, // Standard banner ad height
    width: '100%',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
});

export default GameModeSelectScreen;

