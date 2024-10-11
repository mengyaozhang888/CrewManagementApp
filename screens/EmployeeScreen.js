import React, { createContext, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

import EmployeeItem from "../components/EmployeeItem";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import { useEmployee } from "../components/EmployeeContext";
import { useFocusEffect } from "@react-navigation/native";

const EmployeeScreen = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { employees, loadEmployees, addTask, completeTask } = useEmployee();

  //if we back to this tab,then reload employees
  useFocusEffect(
    useCallback(() => {
      console.log("Screen is focused,reloading employees");
      loadEmployees();
    }, [loadEmployees])
  );

  //load employees
  useEffect(() => {
    console.log("Current employees:", employees);
  }, [employees]);
  //handle modal open
  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };
  //handle modal close
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  //when click complete task button,complete the task to ''.
  const onCompleteTask = async () => {
    if (selectedEmployee) {
      await completeTask(selectedEmployee.id);
      loadEmployees();
      closeModal();
      selectedEmployee((prevState) => ({
        ...prevState,
        currentTask: "",
      }));
    }
  };

  //add task
  const handleAddTask = async (task) => {
    if (selectedEmployee) {
      await addTask(selectedEmployee.id, task);
      loadEmployees();
      closeModal();
      selectedEmployee((prevState) => ({
        ...prevState,
        currentTask: "task",
      }));
    }
  };

  const renderItem = ({ item }) => (
    <EmployeeItem item={item} onPress={() => openModal(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        extraData={employees}
      />
      <EmployeeDetailModal
        isVisible={isModalVisible}
        employee={selectedEmployee}
        onClose={closeModal}
        addTask={handleAddTask}
        onCompleteTask={onCompleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
});

export default EmployeeScreen;
