// components/RoleCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const RoleCard = ({name, role, onPress, backgroundColor = '#d6c8ff'}) => {
  const isObjectRole = typeof role === 'object';

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      style={[styles.card, {backgroundColor}]}
      onPress={onPress}
      disabled={!onPress}>
      <Text style={styles.name}>{name}</Text>

      {isObjectRole && role.icon ? (
        <Text style={styles.icon}>{role.icon}</Text>
      ) : null}

      <Text style={styles.role}>{isObjectRole ? role.name : role}</Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    elevation: 3,
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Marker Felt',
    color: '#ffffff',
  },
  icon: {
    fontSize: 30,
    marginVertical: 4,
  },
  role: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
  },
});

export default RoleCard;
