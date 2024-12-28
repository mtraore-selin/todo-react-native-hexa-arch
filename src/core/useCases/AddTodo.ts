// biome-ignore lint/style/useImportType: <explanation>
import {Todo} from '../entities/Todo';
import {TodoAPI} from '../../infrastructure/TodoAPI';

export const AddTodo = async (title: string): Promise<Todo> => {
  return await TodoAPI.createTodo({userId: 13, title, completed: false});
};
