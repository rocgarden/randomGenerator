// 📄 src/screens/ShuffleNamesScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  SafeAreaView,
} from 'react-native';
import { useNameList } from '../context/NamesListContext';
import ShuffleNames from '../components/ShuffleNames';
import StartOverButton from '../components/StartOverButton';

const AnimatedNameItem = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
      <Text style={styles.name}>
        {index + 1}. {item}
      </Text>
    </Animated.View>
  );
};

const ShuffleNamesScreen = () => {
  const { state, handleShuffleNames } = useNameList();

  useEffect(() => {
    handleShuffleNames(); // Auto-shuffle on mount
  }, []);

  const handleShuffle = () => {
    handleShuffleNames(); // Manual reshuffle
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔀 Shuffled Names</Text>

      <FlatList
        data={state.shuffledNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AnimatedNameItem item={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
      />

      <ShuffleNames
        handleShuffleNames={handleShuffle}
        isDisabled={state.names.length === 0}
      />

      <StartOverButton />

      <View style={styles.adSpace}>
        <Text style={{ color: '#aaa' }}>Ad Placeholder</Text>
      </View>
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
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Marker Felt',
    color: '#6f42c1',
  },
  card: {
    backgroundColor: '#fdcb6e',
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor:'#fff'
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Marker Felt',
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 100, // for buttons and ad
  },
  adSpace: {
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

export default ShuffleNamesScreen;

