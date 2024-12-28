// biome-ignore lint/style/useImportType: <explanation>
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import TodoList from '../components/TodoList';
// biome-ignore lint/style/useImportType: <explanation>
import {Todo} from '../../core/entities/Todo';
import {GetTodos} from '../../core/useCases/GetTodos';
import {AddTodo} from '../../core/useCases/AddTodo';
import {UpdateTodo} from '../../core/useCases/UpdateTodo';

const TodoScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await GetTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const todo = await AddTodo(newTodo);
      setTodos(prev => [...prev, todo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    const updatedTodo = await UpdateTodo({...todo, completed: !todo.completed});
    setTodos(prev =>
      prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Add a new task"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Todo" onPress={handleAddTodo} color="#6200EE" />
      </View>
      <TodoList todos={todos} onToggle={handleToggleTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
});

export default TodoScreen;
