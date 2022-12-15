import "./styles.css";
import { Sidebar } from "./SideBar";
import React from "react";
import { nanoid } from "nanoid";
import Split from "react-split";
import { TextEditor } from "./TextTyper";
import image from "./todo.png";
function Navbar() {
  return (
    <nav>
      <img src={image}></img>
      <h1 className="heading">My Todo List</h1>
    </nav>
  );
}

export default function App() {
  const [Todo, setTodo] = React.useState(
    () => JSON.parse(localStorage.getItem("Todo")) || []
  );
  const [currTodoId, setTodoId] = React.useState((Todo[0] && Todo[0].id) || "");
  React.useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(Todo));
  }, [Todo]);
  function createTodo() {
    const newTodo = {
      id: nanoid(), //javascript function to create ids for props
      body: "#Title"
    };
    setTodo((prevTodo) => [newTodo, ...prevTodo]);
    setTodoId(newTodo.id);
  }
  function deleteTodo(event, todoId) {
    event.stopPropagation();

    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));
  }
  function findCurrentTodo() {
    return (
      Todo.find((todo) => {
        return todo.id === currTodoId;
      }) || Todo[0]
    );
  }
  function updateTodo(text) {
    setTodo((oldTodo) => {
      const newArray = [];
      for (let i = 0; i < oldTodo.length; i++) {
        const newTodo = oldTodo[i];
        if (newTodo.id === currTodoId) {
          newArray.push({ ...newTodo, body: text });
        } else {
          newArray.push(newTodo);
        }
      }
      return newArray;
    });
  }

  return (
    <main>
      {Todo.length > 0 ? (
        <div>
          <Navbar />
          <Split size={[30, 50]} direction="horizontal" className="split">
            <Sidebar
              Todo={Todo}
              newTodo={createTodo}
              delete={deleteTodo}
              setTodoId={setTodoId}
              currentTodo={findCurrentTodo()}
            />

            {currTodoId && Todo.length > 0 && (
              <TextEditor
                currentTodo={findCurrentTodo()}
                updateTodo={updateTodo}
              />
            )}
          </Split>
        </div>
      ) : (
        <>
          <div className="Notodo">
            <h1>You dont have any TodoList yet</h1>
            <button onClick={createTodo}>Create new Note</button>
          </div>
        </>
      )}
    </main>
  );
}
