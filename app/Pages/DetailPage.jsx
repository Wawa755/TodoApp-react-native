import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTodoStore } from "../Store/TodoStore";
import { useLocalSearchParams } from "expo-router";

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const todoStore = useTodoStore();
  const task = todoStore.todoList[Number(id)];

  //checking existance of task
  if (!task) {
    return (
      <View style={detailStyles.page}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Todo not found.</Text>
        </View>
      </View>
    );
  }

  //date formatting
  const formatDate = (isoDate) => {
    if (!isoDate) return "No date provided";
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={detailStyles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo Details</Text>

        <View style={styles.labelContainer}>
          <Text>
            <Text style={styles.bold}>Title: </Text>
            {task.title}
          </Text>
        </View>

        <View style={styles.labelContainer}>
          <Text>
            <Text style={styles.bold}>Description: </Text>
            {task.description || "No description"}
          </Text>
        </View>

        <View style={styles.labelContainer}>
          <Text>
            <Text style={styles.bold}>Status: </Text>
            {task.status || "Unknown"}
          </Text>
        </View>

        <View style={styles.labelContainer}>
          <Text>
            <Text style={styles.bold}>Deadline: </Text>
            {formatDate(task.date)}
          </Text>
        </View>
      </View>
    </View>
  );
};

//STYLING!
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF9F6",
    borderRadius: 20,
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8c00ff",
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#8c00ff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

const detailStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#faebd7",
  },

});

export default DetailPage;
