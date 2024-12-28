This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## STEP TO CREATE TODO APP IN HEXAGONAL ARCHITECTURE
Creating a React Native Todo app using **Hexagonal Architecture** and **json-server** requires a clear structure that adheres to the principles of modularity and separation of concerns. Here's a step-by-step guide to achieving this:

---

### **1. Set up the Project**

1. **Initialize React Native Project:**
   ```bash
   npx react-native init TodoApp
   cd TodoApp
   ```

2. **Install Dependencies:**
   Install the necessary libraries:
   ```bash
   npm install axios json-server
   ```

3. **Set Up json-server:**
   Create a `db.json` file in the root directory with the following structure:
   ```json
   {
     "todos": [
       { "id": 1, "title": "Sample Todo", "completed": false }
     ]
   }
   ```

   Start the server:
   ```bash
   npx json-server --watch db.json --port 3000
   ```

   Your API will now be available at `http://localhost:3000`.

---

### **2. Implement Hexagonal Architecture**
Hexagonal Architecture divides the app into three layers:

1. **Core/Domain Layer**  
   - Contains the business logic and entities.
2. **Application Layer**  
   - Contains the use cases and interacts with the Domain and Infrastructure layers.
3. **Infrastructure Layer**  
   - Handles external interactions like API calls and databases.

---

#### **Folder Structure**
Here’s a suggested folder structure:

```
src/
  ├── core/
  │   ├── entities/
  │   │   └── Todo.ts
  │   └── useCases/
  │       ├── AddTodo.ts
  │       ├── GetTodos.ts
  │       └── UpdateTodo.ts
  ├── infrastructure/
  │   └── TodoAPI.ts
  ├── ui/
  │   ├── components/
  │   │   ├── TodoItem.tsx
  │   │   └── TodoList.tsx
  │   ├── screens/
  │   │   └── TodoScreen.tsx
  │   └── App.tsx
  └── index.tsx
```

---

### **3. Implementing the Layers**

#### **Core Layer**
- **Todo Entity (`src/core/entities/Todo.ts`):**
  ```typescript
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  ```

- **Use Cases (`src/core/useCases/GetTodos.ts`, etc.):**

  - `GetTodos.ts`:
    ```typescript
    import { Todo } from "../entities/Todo";
    import { TodoAPI } from "../../infrastructure/TodoAPI";

    export const GetTodos = async (): Promise<Todo[]> => {
      return await TodoAPI.fetchTodos();
    };
    ```

  - `AddTodo.ts`:
    ```typescript
    import { Todo } from "../entities/Todo";
    import { TodoAPI } from "../../infrastructure/TodoAPI";

    export const AddTodo = async (title: string): Promise<Todo> => {
      return await TodoAPI.createTodo({ title, completed: false });
    };
    ```

  - `UpdateTodo.ts`:
    ```typescript
    import { Todo } from "../entities/Todo";
    import { TodoAPI } from "../../infrastructure/TodoAPI";

    export const UpdateTodo = async (todo: Todo): Promise<Todo> => {
      return await TodoAPI.updateTodo(todo);
    };
    ```

---

#### **Infrastructure Layer**
- **API Service (`src/infrastructure/TodoAPI.ts`):**
  ```typescript
  import axios from "axios";
  import { Todo } from "../core/entities/Todo";

  const BASE_URL = "http://localhost:3000/todos";

  export const TodoAPI = {
    fetchTodos: async (): Promise<Todo[]> => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
    createTodo: async (todo: Partial<Todo>): Promise<Todo> => {
      const response = await axios.post(BASE_URL, todo);
      return response.data;
    },
    updateTodo: async (todo: Todo): Promise<Todo> => {
      const response = await axios.put(`${BASE_URL}/${todo.id}`, todo);
      return response.data;
    },
  };
  ```

---

#### **UI Layer**
- **Components:**

  - **TodoItem (`src/ui/components/TodoItem.tsx`):**
    ```tsx
    import React from "react";
    import { View, Text, Button } from "react-native";
    import { Todo } from "../../core/entities/Todo";

    interface Props {
      todo: Todo;
      onToggle: (todo: Todo) => void;
    }

    const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
      return (
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={{ textDecorationLine: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </Text>
          <Button title={todo.completed ? "Undo" : "Complete"} onPress={() => onToggle(todo)} />
        </View>
      );
    };

    export default TodoItem;
    ```

  - **TodoList (`src/ui/components/TodoList.tsx`):**
    ```tsx
    import React from "react";
    import { FlatList } from "react-native";
    import TodoItem from "./TodoItem";
    import { Todo } from "../../core/entities/Todo";

    interface Props {
      todos: Todo[];
      onToggle: (todo: Todo) => void;
    }

    const TodoList: React.FC<Props> = ({ todos, onToggle }) => {
      return (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TodoItem todo={item} onToggle={onToggle} />}
        />
      );
    };

    export default TodoList;
    ```

- **Screen:**

  - **TodoScreen (`src/ui/screens/TodoScreen.tsx`):**
    ```tsx
    import React, { useState, useEffect } from "react";
    import { View, TextInput, Button } from "react-native";
    import TodoList from "../components/TodoList";
    import { GetTodos, AddTodo, UpdateTodo } from "../../core/useCases";
    import { Todo } from "../../core/entities/Todo";

    const TodoScreen: React.FC = () => {
      const [todos, setTodos] = useState<Todo[]>([]);
      const [newTodo, setNewTodo] = useState("");

      useEffect(() => {
        const fetchTodos = async () => {
          const fetchedTodos = await GetTodos();
          setTodos(fetchedTodos);
        };

        fetchTodos();
      }, []);

      const handleAddTodo = async () => {
        if (newTodo.trim()) {
          const todo = await AddTodo(newTodo);
          setTodos((prev) => [...prev, todo]);
          setNewTodo("");
        }
      };

      const handleToggleTodo = async (todo: Todo) => {
        const updatedTodo = await UpdateTodo({ ...todo, completed: !todo.completed });
        setTodos((prev) =>
          prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        );
      };

      return (
        <View style={{ padding: 20 }}>
          <TextInput
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add a new task"
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <Button title="Add Todo" onPress={handleAddTodo} />
          <TodoList todos={todos} onToggle={handleToggleTodo} />
        </View>
      );
    };

    export default TodoScreen;
    ```

---

### **4. Run the App**
1. Start the json-server:
   ```bash
   npx json-server --watch db.json --port 3000
   ```

2. Run the React Native app:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

---

