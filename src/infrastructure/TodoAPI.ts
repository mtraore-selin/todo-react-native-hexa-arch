import axios from 'axios';
import type {Todo} from '../core/entities/Todo';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const TodoAPI = {
  fetchTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
  createTodo: async (todo: Partial<Todo>): Promise<Todo> => {
    const response = await axios.post(`${BASE_URL}`, todo);
    return response.data;
  },
  updateTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${BASE_URL}/${todo.id}`, todo);
    return response.data;
  },
};
