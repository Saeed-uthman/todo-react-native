from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer


class TodoListCreate(generics.ListCreateAPIView):
    """
    Handles two actions:

    GET /api/todos/
    - Returns all todos.

    POST /api/todos/
    - Creates a new todo.
    """

    # This is the data we want to work with.
    # We order newest todos first.
    queryset = Todo.objects.all().order_by("-created_at")

    # This tells DRF how to convert Todo objects to JSON,
    # and how to convert JSON back into Todo objects.
    serializer_class = TodoSerializer
    
class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles actions for one todo:

    GET /api/todos/<id>/
    - Returns one todo.

    PUT/PATCH /api/todos/<id>/
    - Updates one todo.

    DELETE /api/todos/<id>/
    - Deletes one todo.
    """

    # This gives DRF access to all Todo records.
    queryset = Todo.objects.all()

    # This serializer controls the JSON input/output.
    serializer_class = TodoSerializer
