import React, { createContext, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

//use child components
import EmployeeItem from "../components/EmployeeItem";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
//import context
import { useEmployee } from "../components/EmployeeContext";
//import focus effect
import { useFocusEffect } from "@react-navigation/native";

//screen for employees
const EmployeeScreen = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { employees, loadEmployees, addTask, completeTask } = useEmployee();

  //if we back to this tab,then reload employees
  useFocusEffect(
    useCallback(() => {
      loadEmployees();
    }, [loadEmployees])
  );

  //load employees
  useEffect(() => {}, [employees]);
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
      setSelectedEmployee((prevState) => ({
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
      setSelectedEmployee((prevState) => ({
        ...prevState,
        currentTask: "task",
      }));
    }
  };

  //for rendering employee list
  const renderItem = ({ item }) => (
    <EmployeeItem item={item} onPress={() => openModal(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employee List</Text>

      {/* //render list */}
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        extraData={employees}
      />
      {/* //modal,click the item,open modal */}
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default EmployeeScreen;
