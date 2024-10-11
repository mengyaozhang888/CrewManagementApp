import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const TaskManagement = ({ employee, onCompleteTask, onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };
  const handleCompleteTask = () => {
    Alert.alert(
      "Complete Task",
      "Are you sure you want to complete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => onCompleteTask() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.taskManagementContainer}>
      <Text style={styles.taskTitle}>
        {employee.currentTask ? "Current Task" : "Add New Task"}
      </Text>
      <View style={styles.inputContainer}>
        {employee.currentTask ? (
          <>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskText}>{employee.currentTask}</Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCompleteTask}
            >
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.taskInput}
              placeholder="Enter task description"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAddTask}
            >
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const EmployeeDetailModal = ({
  isVisible,
  employee,
  onClose,
  addTask,
  onCompleteTask,
}) => {
  if (!isVisible || !employee) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={{ width: "100%" }}
          >
            <Text style={styles.modalText}>Employee Details</Text>
            <Text style={styles.infoText}>Name: {employee.name}</Text>
            <Text style={styles.infoText}>Role: {employee.role}</Text>

            <TaskManagement
              employee={employee}
              onCompleteTask={onCompleteTask}
              onAddTask={addTask}
            />

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EmployeeDetailModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: screenWidth * 0.9,
    maxHeight: "80%",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
    alignSelf: "flex-start",
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  // TaskManagement styles
  taskManagementContainer: {
    width: "100%",
    marginVertical: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  taskTextContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  taskInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
