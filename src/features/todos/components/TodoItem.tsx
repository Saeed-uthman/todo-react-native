import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleArea} onPress={() => onToggle(todo)}>
        <Text style={styles.checkbox}>{todo.completed ? "[x]" : "[ ]"}</Text>

        <Text style={[styles.title, todo.completed && styles.completedTitle]}>
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  titleArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  checkbox: {
    fontSize: 16,
    marginRight: 10,
    minWidth: 28,
  },
  title: {
    fontSize: 16,
    color: "#111827",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
