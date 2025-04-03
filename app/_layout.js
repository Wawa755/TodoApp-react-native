import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { TodoProvider } from "./Store/TodoStore";

export default function Layout() {
  return (
    <TodoProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
