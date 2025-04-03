import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FilterOverview({ filter, onFilterChange }) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filter}
        onValueChange={(value) => onFilterChange(value)}
        style={styles.picker}
        itemStyle={styles.item}
      >
        <Picker.Item label="All todos" value="all" />
        <Picker.Item label="Completed todos" value="completed" />
        <Picker.Item label="Incomplete todos" value="incomplete" />
        <Picker.Item label="Overdue todos" value="overdue" />
        <Picker.Item label="Completed on time" value="completed-on-time" />
      </Picker>
    </View>
  );
}

//STYLING!
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: 'black',
    height: 50,
    width: 250,
    borderRadius: 10,
    color: 'white',
  },
  item: {
    color: 'white',
    fontSize: 16,
  },
});
