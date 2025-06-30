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
import AnimatedNameItem from '../components/AnimatedNameItem';

// const AnimatedNameItem = ({ item, index }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(10)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400,
//         delay: index * 80,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 400,
//         delay: index * 80,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           opacity: fadeAnim,
//           transform: [{ translateY: slideAnim }],
//         },
//       ]}>
//       <Text style={styles.name}>
//         {index + 1}. {item}
//       </Text>
//     </Animated.View>
//   );
// };

const ShuffleNamesScreen = () => {
  const { state, handleShuffleNames } = useNameList();
  const [isShuffling, setIsShuffling] = React.useState(false);
  const itemRefs = useRef([]);

useEffect(() => {
  itemRefs.current = itemRefs.current.slice(0, state.shuffledNames.length);
}, [state.shuffledNames]);


  useEffect(() => {
    handleShuffleNames(); // Auto-shuffle on mount
  }, []);


 
 const handleShuffle = () => {
   setIsShuffling(true);

   // First: shuffle names immediately
   handleShuffleNames();

   // Then: trigger animations on new items
   setTimeout(() => {
     itemRefs.current.forEach((ref, i) => {
       if (ref?.animate) {
         ref.animate(i * 80); // staggered pulse
       }
     });
     setIsShuffling(false);
   }, 90); // small delay to let the FlatList render new items
 };




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔀 Shuffled Names</Text>

      {/* {isShuffling && <Text style={styles.shufflingText}>Shuffling...</Text>} */}

      <FlatList
        data={state.shuffledNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          if (!itemRefs.current[index]) {
            itemRefs.current[index] = React.createRef();
          }
          return (
            <AnimatedNameItem
              ref={ref => (itemRefs.current[index] = ref)}
              item={item}
              index={index}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
      />

      <ShuffleNames
        handleShuffleNames={handleShuffle}
        isDisabled={state.names.length === 0}
      />

      <StartOverButton />

      <View style={styles.adSpace}>
        <Text style={{color: '#aaa'}}>Ad Placeholder</Text>
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
    borderColor: '#fff',
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
  shufflingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20
  },
});

export default ShuffleNamesScreen;

