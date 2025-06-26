//app/screens/playerSetupScreen.jsx
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import OrderedNameList from "../components/OrderedNameList";
import { useNameList } from "../context/NamesListContext";
import NameInput from "../components/NameInput";
import { SafeAreaView } from "react-native-safe-area-context";
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// function Section({children, title}) {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {color: isDarkMode ? Colors.white : Colors.black},
//         ]}>
//         {title}
//       </Text>

//       {typeof children === 'string' || typeof children === 'number' ? (
//         <Text
//           style={[
//             styles.sectionDescription,
//             {color: isDarkMode ? Colors.light : Colors.dark},
//           ]}>
//           {children}
//         </Text>
//       ) : (
//         <View>{children}</View>
//       )}
//     </View>
//   );
// }


const NamesList = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const {
    state,
    handleAddName,
    name,
    setName,
    handleDeleteName,
  } = useNameList();

  const handleContinue = () => {
    if (state.gameMode === 'assignCharacters') {
      navigation.navigate('AssignCharactersScreen');
    } else if (state.gameMode === 'sceneGenerator') {
      navigation.navigate('SceneGeneratorScreen');
    } else if (state.gameMode === 'shuffleNames') {
      navigation.navigate('ShuffleNamesScreen');
    } else if (state.gameMode === 'createGroups') {
      navigation.navigate('CreateGroups');
    } else if (state.gameMode === 'duelOff') {
      navigation.navigate('DuelModeScreen');
    } else if (state.gameMode === 'icebreakers') {
      navigation.navigate('IcebreakerModeScreen');
    }
  };

  const formatGameMode = mode => {
    if (!mode) return 'Continue';
    return mode
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <SafeAreaView style={styles.screenView}>
      <View style={styles.contentContainer}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.sceneTitle}>Create List</Text>
        {state.names.length === 0 ? (
          <Text style={styles.subText}>
            Add each player's name below to get started 🎉
          </Text>
        ) : null}

        <View style={styles.headerContainer}>
          <View style={styles.separator}>
            {state.names.length === 0 ? null : (
              <Text style={styles.highlight}>Tap Name to Delete</Text>
            )}
          </View>
          <OrderedNameList
            names={state.names}
            handleDeleteName={handleDeleteName}
          />
          <NameInput
            name={name}
            setName={setName}
            handleAddName={handleAddName}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.customButton,
            state.names.length === 0 && {opacity: 0.5},
          ]}
          onPress={handleContinue}
          disabled={state.names.length === 0}>
          <Text style={styles.customButtonText}>
            {`${formatGameMode(state.gameMode)} ➡️`}
          </Text>
        </TouchableOpacity>
      </View>
      {/* 🟨 Reserve space for banner ad */}
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      /> */}
      {/* Spacer if ad is not active */}
      {/* <View style={{height: 60}} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: '#f0eaff',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 5,
    textShadowColor: 'black',
    textShadowRadius: 6,
    textAlign: 'center',
  },
  sceneTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#6f42c1',
    fontFamily: 'Marker Felt',
    textShadowColor: '#ccc',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  subText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: '700',
  },
  headerContainer: {
    // marginHorizontal: 16,
    // marginTop: 5,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  separator: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 3,
    borderRadius: 5,
  },
  customButton: {
    borderRadius: 20,
    // margin: 10,
    backgroundColor: '#6c5ce7',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 25,
    elevation: 2,
    marginHorizontal: 20,
  },
  customButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NamesList;
