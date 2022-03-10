import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, TextField, List, Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Todo from "./components/Todo";
import firebase from "firebase/app";
import db from "./firebase.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(db.collection("todos"));
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 align="center">Todo List</h1>
        <Box display="flex" justifyContent="center">
          <form noValidate autoComplete="off">
            <TextField
              type="text"
              placeholder="input todo item"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
          </form>
          <Box ml={2}>
            <Button
              disabled={!input.length > 0}
              onClick={addTodo}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Box>
        </Box>

        <List>
          {todos.map((todo) => (
            // <li>{todo}</li>
            <Todo todo={todo} key={todo.id} />
          ))}
          {/* {todos.map((todo) => {
          return <li>{todo}</li>;
        })} */}
        </List>
      </Container>
    </div>
  );
}

export default App;
