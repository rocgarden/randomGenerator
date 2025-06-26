import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import StartOverButton from './StartOverButton';

const ScreenWrapper = ({children, scrollable = false, style = {}}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 120, // Room for buttons and ads
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default ScreenWrapper;
