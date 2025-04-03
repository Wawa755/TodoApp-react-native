import React from 'react';
import { StyleSheet, View } from 'react-native';

const WebCheckbox = ({ value, onValueChange }) => (
  <View style={styles.checkboxContainer}>
    <input type="checkbox" checked={value} onChange={(e) => onValueChange(e.target.checked)} style={styles.checkbox} />
  </View>
);

//STYLING!
const styles = StyleSheet.create({
  checkbox: {
    marginRight: 8,
    cursor: 'pointer'
  },
});

export default WebCheckbox;
