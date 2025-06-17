import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import OrderedNameList from "./OrderedNameList";
import OrderedNameListTestPage from "./OrderedListTestPage";
import { useNameList } from "./NamesListContext";
import NameInput from "./NameInput";
import ShuffleNames from "./ShuffleNames";
import { SafeAreaView } from "react-native-safe-area-context";
import ShuffledNamesModal from "./ShuffledNamesModal";
import CreateGroupsButton from "./CreateGroupsButton";
import CreateGroups from "./CreateGroups";
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

const NamesList = ({  }) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false); // Add state for modal visibility

  const {
    state,
    handleAddName,
    name,
    setName,
    handleDeleteName,
    handleShuffleNames,
    handleClearNames
  } = useNameList();
    
     const openModal = () => {
       setIsModalVisible(true); // Open modal
     };

     const closeModal = () => {
       setIsModalVisible(false); // Close modal
     };
     const handleShuffleAndOpenModal = () => {
        handleShuffleNames(); // Shuffle the names
        openModal(); // Open the modal immediately after shuffling
     };
    
  return (
    <SafeAreaView>
      <View>
        <Section title="Random Names Generator">
          Enter <Text style={styles.highlight}>Names</Text> to create a random
          order.
        </Section>
        <View style={styles.nameInputContainer}>
          <NameInput
            name={name}
            setName={setName}
            handleAddName={handleAddName}
          />
        </View>
        <View>
          {state.names.length > 0 ? (
            <View style={styles.headerContainer}>
              <View style={styles.separator}>
                <Text style={styles.studentsTextTitle}>Students: </Text>
                <Text style={styles.highlight}>Tap Name to Delete </Text>
              </View>
              <OrderedNameList
                names={state.names}
                handleDeleteName={handleDeleteName}
              />
            </View>
          ) : null}
          {/* buttons */}
          <View style={styles.buttonsView}>
            {state.names.length > 0 ? (
              <View style={styles.buttonContainer}>
                <ShuffleNames
                  handleShuffleNames={handleShuffleAndOpenModal}
                  isDisabled={state.names.length === 0}
                />
                <CreateGroupsButton state={state.names} />
                <View style={styles.clearButtonContainer}>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClearNames}
                    //disabled={isDisabled}
                  >
                    <Text style={styles.clearButtonText}> Clear</Text>
                  </TouchableOpacity>
                </View>
                {/* Clear Button */}
              </View>
            ) : null}
          </View>
          {/* Show modal conditionally */}
          {isModalVisible && (
            <ShuffledNamesModal
              state={state} // Pass state to the modal to display shuffled names
              closeModal={closeModal} // Pass closeModal function to the modal
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
    // backgroundColor: '#FFFCF3',
    //justifyContent: 'center',
    //alignItems: 'center',
    //fontFamily: 'sans-serif',
    paddingTop: 20,
    paddingBottom: 10,
    //width: 100,
    // backgroundColor: '#f1f5f8',
    //borderRadius: 20,
    // minHeight: 500,
    //maxWidth: 500,
    //minWidth: 250,
    //boxShadow: '4px 3px 7px 2px #00000040',
    // padding: 16,
    //boxSizing: 'border-box',
  },
  item: {
    flex: 1,
    padding: 2,
    fontSize: 15,
  },
  buttonsView: {
    // flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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
  highlight: {
    fontWeight: '700',
  },
  button: {
    //padding: 3,
    margin: 5,
    textDecoration: 'none',
    borderRadius: 5,
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdcb6e',
  },
  buttonContainer: {
    //margin: 5,
    flexDirection: 'row',
  },
  headerContainer: {
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    maxWidth: 800,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFcf3',
    borderRadius: 20,
    boxShadow: '4px 3px 7px 2px #00000040',
  },
  studentsTextTitle: {
    //padding: 4,
    fontSize: 20,
    fontFamily: 'Marker Felt',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  separator: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    //backgroundColor: 'red',
    padding: 3,
    borderRadius: 5,
  },
  clearButton: {
    //width: '100%',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  clearButtonText: {
    fontFamily: 'Marker Felt',
    fontSize: 18,
  },
  clearButtonContainer: {
    margin: 5,
    width: 90,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default NamesList;



                // <TouchableOpacity
                //   style={styles.button}
                //   onPress={() => {
                //     navigation.navigate('CreateGroups', {
                //       state: state.names,
                //     });
                //   }}
                //   //disabled={isDisabled}
                // >
                //   <Text>Create Groups</Text>
                // </TouchableOpacity>
