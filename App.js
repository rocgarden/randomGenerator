/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, useWindowDimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NameListProvider } from './src/components/NamesListContext';
import NamesList from './src/components/NamesList';
import TestPage from './src/components/testFile';
import ShuffledNamesModal from './src/components/ShuffledNamesModal';
import CreateGroups from './src/components/CreateGroups';

function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  const {height} = useWindowDimensions();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'red',
  };

  return (
    <View style={{height}}>
      <NameListProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{contentStyle: {backgroundColor: '#fdcb6e'}}}
            initialRouteName="NamesList">
            <Stack.Screen
              name="NamesList"
              component={NamesList}
              options={{header: () => null}}
            />
            <Stack.Screen name="TestPage" component={TestPage} />
            <Stack.Screen
              name="ShuffledNamesModal"
              component={ShuffledNamesModal}
              screenOptions={{
                presentation: 'pageSheet', // This will make it show as a modal
              }}
            />
            <Stack.Screen name="CreateGroups" component={CreateGroups} />
          </Stack.Navigator>
          {/* <StatusBar
            barStyle={isDarkMode ? styles.container : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          /> */}
          {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>  */}
          {/* <Header /> */}

          {/* <NamesList/> */}
          {/* <NameListProvider>
              </NameListProvider> */}
          {/* <Section title="Step One">
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Section>
              <Section title="See Your Changes">
                <ReloadInstructions />
              </Section>
              <Section title="Debug">
                <DebugInstructions />
              </Section>
              <Section title="Learn More">
                Read the docs to discover what to do next:
              </Section> */}
          {/* <LearnMoreLinks /> */}
          {/* </ScrollView> */}
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
