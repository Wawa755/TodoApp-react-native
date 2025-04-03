import React, { useState } from "react";
import { Platform, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTodoStore } from "../Store/TodoStore";
import { useRouter } from "expo-router";

//date picker for non-web
import DateTimePicker from "@react-native-community/datetimepicker"; 
//datepicker for browser
let DatePicker;
if (Platform.OS === "web") {
  DatePicker = require("react-datepicker").default;
  require("react-datepicker/dist/react-datepicker.css");
}

const CreateNew = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const todoStore = useTodoStore();
  const router = useRouter();

  //making sure title is written
  const submitTask = () => {
    if (!taskTitle.trim()) {
      console.log("Empty title!");
      if (Platform.OS === "web") {
        window.alert("Todo title can't be empty!");
      } else {
        Alert.alert("Error", "Todo title can't be empty!");
      }
      return;
    }

    todoStore.addTask(taskTitle, taskDescription, taskDate);

    //resetting fields after todo creation
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate(new Date());

    //redirecting to Overview/index
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Todo</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Write todo title..." 
        value={taskTitle} 
        onChangeText={setTaskTitle} 
      />
      <TextInput 
        style={styles.textarea} 
        placeholder="Write todo description..." 
        value={taskDescription} 
        onChangeText={setTaskDescription} 
        multiline 
      />
      
      {Platform.OS === "web" ? (
        <DatePicker 
          selected={taskDate} 
          onChange={(date) => setTaskDate(date)} 
          dateFormat="yyyy-MM-dd" 
          className="date-picker" 
        />
      ) : (
        <>
          <Button title="Pick Date" onPress={() => setShowPicker(true)} color="#8c00ff" />
          {showPicker && (
            <DateTimePicker 
              value={taskDate} 
              mode="date" 
              display="default" 
              onChange={(event, date) => { 
                setShowPicker(false); 
                if (date) setTaskDate(date); 
              }} 
            />
          )}
        </>
      )}
      
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={submitTask} color="#8c00ff" />
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
    fontWeight: "bold",
    color: "#8c00ff",
    marginBottom: 15
  },
  
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    marginBottom: 10
  },
  
  textarea: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 60,
    textAlignVertical: "top",
    marginBottom: 10
  },

  buttonContainer: {
    marginTop: 20
  },
});

export default CreateNew;
