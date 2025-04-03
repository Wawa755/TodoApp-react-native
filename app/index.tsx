import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTodoStore } from "./Store/TodoStore";
import FilterOverview from "./Components/Filter_overview";
import NativeCheckBox from "@react-native-community/checkbox";
import WebCheckbox from "./Components/Web_checkbox";
import { Todo } from "./todo";

type FilterValue = "all" | "completed" | "incomplete" | "overdue" | "completed-on-time";

const Index = () => {
  const todoStore = useTodoStore();
  const router = useRouter();

  //filter
  const [filter, setFilter] = useState<FilterValue>("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todoStore.todoList);

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    let newFilteredTodos = [...todoStore.todoList];

    switch (filter) {
      case "completed":
        newFilteredTodos = newFilteredTodos.filter(todo => todo.status === "complete");
        break;
      case "incomplete":
        newFilteredTodos = newFilteredTodos.filter(todo => todo.status === "incomplete");
        break;
      case "overdue":
        newFilteredTodos = newFilteredTodos.filter(todo =>
          todo.date && new Date(todo.date) < new Date() && todo.status === "incomplete"
        );
        break;
      case "completed-on-time":
        newFilteredTodos = newFilteredTodos.filter(todo =>
          todo.status === "complete" && todo.date && new Date(todo.date) >= new Date(todo.completedAt || new Date())
        );
        break;
    }
    setFilteredTodos(newFilteredTodos);
  }, [filter, todoStore.todoList]);


  //checkbox (state)
  const renderCheckbox = (item: Todo, index: number) => {
    return Platform.OS === "web" ? (
      <WebCheckbox
        value={item.status === "complete"}
        onValueChange={() => todoStore.updateTaskStatus(index)}
      />
    ) : (
      <NativeCheckBox
        value={item.status === "complete"}
        onValueChange={() => todoStore.updateTaskStatus(index)}
      />
    );
  };

  //a todo
  const renderItem = ({ item, index }: { item: Todo; index: number }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoContent}>
        {renderCheckbox(item, index)}
        <TouchableOpacity
          onPress={() => router.push(`/Pages/DetailPage?id=${index}`)}
          style={styles.todoTextContainer}
        >
          <Text style={[
            styles.todoText,
            item.status === "complete" && styles.completed,
            item.date && new Date(item.date) < new Date() && item.status !== "complete" && styles.overdue
          ]}>
            {item.title}
          </Text>
          {item.description !== "/" && <Text style={styles.todoDescription}>{item.description}</Text>}
          {item.date && <Text style={styles.todoDate}>{new Date(item.date).toLocaleDateString()}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Todos</Text>
      <FilterOverview filter={filter} onFilterChange={handleFilterChange} />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Todo" onPress={() => router.push("/Pages/CreateNew")} color="#8c00ff" />
      </View>
    </View>
  );
};

//STYLING!!
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "antiquewhite",
    flex: 1
  },
  
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#8c00ff"
  },
  
  todoItem: {
    padding: 15,
    backgroundColor: "#FBF9F6",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  
  todoTextContainer: {
    marginLeft: 10,
    flex: 1
  },
  todoText: {
    fontSize: 16
  },
  
  completed: {
    textDecorationLine: "line-through",
    color: "gray"
  },
  
  overdue: {
    color: "red",
    fontWeight: "bold"
  },

  todoDescription: {
    fontSize: 14,
    color: "gray"
  },
  
  todoDate: {
    fontSize: 14,
    color: "#8c00ff"
  },
  
  buttonContainer: {
    marginTop: 20
  }
});

export default Index;
