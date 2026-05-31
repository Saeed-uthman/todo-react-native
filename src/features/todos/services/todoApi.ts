import { CreateTodoData, Todo, UpdateTodoData } from "../types/todo";

// Use your computer's IPv4 address when testing on a physical phone.
// Django must be running with: python manage.py runserver 0.0.0.0:8000
const API_BASE_URL = "http://10.224.119.101:8000/api";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos/`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(data: CreateTodoData): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}

export async function updateTodo(
  id: number,
  data: UpdateTodoData,
): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
