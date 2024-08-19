import axiosInstance from "../library/axiosInstance";
import { Todo } from "../types";

export const fetchTodo = async (): Promise<Todo[]> => {
  const response = await axiosInstance.get<Todo[]>(`/posts`);
  return response.data;
};

export const mutation = async (newTodo: { title: string; body: string }) => {
  const { data } = await axiosInstance.post<Todo>("/posts", newTodo);
  return data;
};

export const updateTodo = async (updatedTodo: Todo) => {
  const { data } = await axiosInstance.put<Todo>(
    `/posts/${updatedTodo.id}`,
    updatedTodo
  );
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
