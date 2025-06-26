/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  {useEffect} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,Image,
  View, useWindowDimensions
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NameListProvider } from './src/context/NamesListContext';
import NamesList from './src/screens/PlayerSetupScreen';
import TestPage from './src/components/testFile';
import ShuffledNamesModal from './src/screens/ShuffledNamesModal';
import CreateGroups from './src/screens/CreateGroups';
import AssignCharactersScreen from './src/screens/AssignCharactersScreen';
import SceneGeneratorScreen from './src/screens/SceneGeneratorScreen';
import GameModeSelectScreen from './src/screens/GameModeSelectionScreen';
import ShuffleNamesScreen from './src/screens/ShuffleNamesScreen';
import DuelModeScreen from './src/screens/DuelModeScreen';
import IcebreakerModeScreen from './src/screens/IcebreakerModeScreen';
import quickAssign from './src/assets/images/logoFrame.png';

function LogoTitle() {
  return (
    <Image
      source={quickAssign}
      style={{
        width: 45,
        height: 45,
        resizeMode: 'contain',
      }}
    />
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const {height} = useWindowDimensions();
  useEffect(() => {
    RNBootSplash.hide({fade: true}); // Hides splash after app is ready
  }, []);

  return (
    <View style={{height}}>
      <NameListProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              //contentStyle: {backgroundColor: '#18dcff'},
              headerStyle: {
                backgroundColor: '#6f42c1',
              },
              headerBackButtonDisplayMode: 'minimal',
              headerTintColor: '#fff',
              // headerTitle: () => (
              //   <Text style={{fontFamily: 'Marker Felt', color: '#fff'}}>
              //     Role Play
              //   </Text>
              // ),
              // // headerTitleStyle: {
              //   fontFamily: 'Marker Felt',
              // },
              headerTitle: () => <LogoTitle />,
            }}
            initialRouteName="GameModeSelection">
            <Stack.Screen
              name="GameModeSelection"
              component={GameModeSelectScreen}
              options={{header: () => null}}
            />
            <Stack.Screen name="PlayerSetup" component={NamesList} />

            <Stack.Screen name="TestPage" component={TestPage} />
            <Stack.Screen
              name="ShuffledNamesModal"
              component={ShuffledNamesModal}
              screenOptions={{
                presentation: 'pageSheet', // This will make it show as a modal
              }}
            />
            <Stack.Screen name="CreateGroups" component={CreateGroups} />
            <Stack.Screen
              name="AssignCharactersScreen"
              component={AssignCharactersScreen}
            />
            <Stack.Screen
              name="SceneGeneratorScreen"
              component={SceneGeneratorScreen}
            />
            <Stack.Screen
              name="ShuffleNamesScreen"
              component={ShuffleNamesScreen}
            />
            <Stack.Screen name="DuelModeScreen"
              component={DuelModeScreen}
            />
            <Stack.Screen name='IcebreakerModeScreen'
              component={IcebreakerModeScreen}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </NameListProvider>
    </View>
  );
}

const styles = StyleSheet.create({
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
  highlight: {
    fontWeight: '700',
  },
  container: {
    backgroundColor: 'red',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default App;
