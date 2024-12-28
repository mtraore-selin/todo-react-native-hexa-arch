// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
// biome-ignore lint/style/useImportType: <explanation>
import {Todo} from '../../core/entities/Todo';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = ({todo, onToggle}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          todo.completed && styles.completedTitle, // Apply strike-through if completed
        ]}>
        {todo.title}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => onToggle(todo)}>
        <Text style={styles.buttonText}>
          {todo.completed ? 'Undo' : 'Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Keeps Text and Button on opposite ends
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    flex: 1, // Ensures Text takes available space
    fontSize: 16,
    color: '#333',
    marginRight: 10, // Adds spacing between Text and Button
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100, // Ensures consistent width
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TodoItem;
