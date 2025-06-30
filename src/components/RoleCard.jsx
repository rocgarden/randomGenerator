//components/rolecard
import React, { useRef, useState } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const RoleCard = ({name, role, backgroundColor, ...props}) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={[styles.cardWrapper, props.cardStyle]}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor,
              transform: [{rotateY: frontInterpolate}],
              zIndex: flipped ? 0 : 1,
            },
          //  styles.cardFront,
          ]}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.icon}>{role?.icon || '🧑'}</Text>
          <Text style={styles.roleName}>{role?.name || role}</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{rotateY: backInterpolate}],
              zIndex: flipped ? 1 : 0,
            },
          ]}>
          <Text style={styles.roleBackTitle}>
            {role.icon} {role.name}
          </Text>
          <Text style={styles.description}>{role.description}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RoleCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: '45%',
    height: 180,
    margin: 10,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: '#fdcb6e',
  },
  cardBack: {
    backgroundColor: '#ffeaa7',
  },
  name: {
    fontSize: 20,
    fontWeight:'bold',
    fontFamily: 'Marker Felt',
    color: '#ffffff',
  },
  icon: {
    fontSize: 30,
    marginVertical: 8,
  },
  roleName: {
    fontSize: 16,
    color: '#fff',
  },
  roleBackTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
