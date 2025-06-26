import {useNavigation} from '@react-navigation/native';
import {useNameList} from '../context/NamesListContext';
import {Alert, StyleSheet, TouchableOpacity, Text} from 'react-native';

const StartOverButton = () => {
  const navigation = useNavigation();
  const {resetAll} = useNameList();

  const handleStartOver = () => {
    Alert.alert(
      'Start Over?',
      'This will delete all entered names. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Reset',
          onPress: () => {
            resetAll();
            navigation.navigate('GameModeSelection');
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <TouchableOpacity style={styles.customButton} onPress={handleStartOver}>
      <Text style={styles.customButtonText}>Start Over</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: '#6f42c1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartOverButton;
