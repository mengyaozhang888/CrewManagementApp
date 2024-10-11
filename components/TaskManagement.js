import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";

const TaskManagement = ({ employee, onCompleteTask, onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <View style={styles.container}>
      {employee.currentTask ? (
        <View style={styles.taskContainer}>
          <Text style={styles.currentTask}>
            Current Task: {employee.currentTask}
          </Text>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={onCompleteTask}
          >
            <Text style={styles.buttonText}>Complete Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  taskContainer: {
    alignItems: "center",
  },
  currentTask: {
    fontSize: 16,
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default TaskManagement;
