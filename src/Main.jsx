import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Switch, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; 

const Main = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { key: task, done: false, important: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTask('');
    }
  };

  const deleteTask = (key) => {
    const newTasks = tasks.filter(item => item.key !== key);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTaskDone = (key) => {
    const newTasks = tasks.map(item =>
      item.key === key ? { ...item, done: !item.done, important: false } : item
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTaskImportant = (key) => {
    const taskToUpdate = tasks.find(item => item.key === key);
    if (!taskToUpdate.done) { 
      const newTasks = tasks.map(item =>
        item.key === key ? { ...item, important: !item.important } : item
      );
      setTasks(newTasks);
      saveTasks(newTasks);
    }
  };

  const showItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskImportant(item.key)}>
        <Text style={[styles.task, item.done && styles.doneTask, item.important && styles.importantTask]}>
          {item.key}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Switch
          value={item.done}
          onValueChange={() => toggleTaskDone(item.key)}
        />
        <TouchableOpacity onPress={() => deleteTask(item.key)}>
          <MaterialIcons name="delete" size={24} color="#007BFF" /> {/* צבע תואם */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={showItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50, // גובה חדש
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 0, // מרובע
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // מסדר את הפריטים בקצה
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  task: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  doneTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  importantTask: {
    fontWeight: 'bold',
    color: 'black', // צבע טקסט מודגש
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    height: 50, // גובה חדש
    alignItems: 'center',
    borderRadius: 0, // מרובע
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Main;

