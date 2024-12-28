// biome-ignore lint/style/useImportType: <explanation>
import {Todo} from '../entities/Todo';
import {TodoAPI} from '../../infrastructure/TodoAPI';

export const UpdateTodo = async (todo: Todo): Promise<Todo> => {
  return await TodoAPI.updateTodo(todo);
};
