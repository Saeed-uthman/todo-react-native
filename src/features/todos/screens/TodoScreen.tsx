import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoApi";
import { Todo } from "../types/todo";

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      Alert.alert("Error", "Could not load todos");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(title: string) {
    try {
      const newTodo = await createTodo({ title });
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    } catch (error) {
      Alert.alert("Error", "Could not add todo");
    }
  }

  async function handleToggleTodo(todo: Todo) {
    try {
      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === updatedTodo.id ? updatedTodo : item,
        ),
      );
    } catch (error) {
      Alert.alert("Error", "Could not update todo");
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      Alert.alert("Error", "Could not delete todo");
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      <TodoForm onAddTodo={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No todos yet. Add your first one.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f9fafb",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },
  loadingText: {
    marginTop: 10,
    color: "#6b7280",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 30,
  },
});
