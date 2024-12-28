// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import {FlatList} from 'react-native';
import TodoItem from './TodoItem';
// biome-ignore lint/style/useImportType: <explanation>
import {Todo} from '../../core/entities/Todo';

interface Props {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
}

const TodoList: React.FC<Props> = ({todos, onToggle}) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <TodoItem todo={item} onToggle={onToggle} />}
    />
  );
};

export default TodoList;
