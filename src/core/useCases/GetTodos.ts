import {TodoAPI} from '../../infrastructure/TodoAPI';
import type {Todo} from '../entities/Todo';

export const GetTodos = async (): Promise<Todo[]> => {
  return TodoAPI.fetchTodos();
};
