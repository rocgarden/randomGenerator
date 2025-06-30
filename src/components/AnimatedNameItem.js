import React, {useImperativeHandle, useRef, forwardRef, useEffect} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

const AnimatedNameItem = forwardRef(({item, index}, ref) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    // Run initial fade and slide-in animation
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

  useImperativeHandle(ref, () => ({
    animate: (delay = 0) => {
      scaleAnim.setValue(1);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 150,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    },
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}, {scale: scaleAnim}],
        },
      ]}>
      <Text style={styles.name}>
        {index + 1}. {item}
      </Text>
    </Animated.View>
  );
});

export default AnimatedNameItem;

const styles = StyleSheet.create({
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
});
