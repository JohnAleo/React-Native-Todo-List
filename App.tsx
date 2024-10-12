
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Alert 
} from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      Alert.alert('Error', 'Please, enter the data!');
      return;
    }

    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Enter the data..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Adding</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
              <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#538dcc',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default App;
