import {Pressable, Animated, StyleSheet, Text, ImageBackground} from 'react-native';
import {useRef} from 'react';

const GameModeButton = ({emoji, label, onPress, imageSource}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.squareButton, {transform: [{scale: scaleAnim}]}]}>
        <ImageBackground source={imageSource} style={styles.image} imageStyle={styles.imageStyle}>
         <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.label}>{label}</Text>
         </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  squareButton: {
    width: 135,
    height: 135,
    margin: 3,
    //padding: 5,
    borderRadius: 10,
    //backgroundColor: '#fdcb6e',
    //alignItems: 'center',
    //justifyContent: 'center',
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    overflow: 'hidden', // important for rounded corners with ImageBackground
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5, // allows wrapping text some space
  },
  imageStyle: {
    resizeMode: 'cover',
    borderRadius:8
  },
  emoji: {
    fontSize: 32,
    marginBottom: 5,
    textShadowColor: 'black',
    textShadowRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'black',
    textShadowRadius: 4,
    textAlign: 'center',
  },
});

export default GameModeButton;
