import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [List, setList] = useState([]);

  const addTarea = (Tarea) => {
    if (Tarea.trim() === "") return;
    let TareaObj = {
      id: Math.random(1, 20),
      content: Tarea,
    };
    setList([...List, TareaObj]);
    setInput("");
  };

  const clearList = () => {
    setList([]);
  };

  const deleteTarea = (id) => {
    const updatedList = List.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newList = [...List];
    const temp = newList[index];
    newList[index] = newList[index - 1];
    newList[index - 1] = temp;
    setList(newList);
  };

  const moveDown = (index) => {
    if (index === List.length - 1) return;
    const newList = [...List];
    const temp = newList[index];
    newList[index] = newList[index + 1];
    newList[index + 1] = temp;
    setList(newList);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTarea(input);
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center text-info">Lista de tareas</h3>
      <div className="col-md-8 d-flex gap-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control mx-auto"
          type="text"
          placeholder="Añade una tarea"
        />
        <button className="btn btn-info w-50" onClick={() => addTarea(input)}>
          Añadir Tarea
        </button>
        <button className="btn btn-danger w-50" onClick={clearList}>
          Vaciar Lista
        </button>
      </div>

      <div className="col-md-8">
        {List.map((item, index) => {
          return (
            <div
              key={item.id}
              className="bg-info mt-2 d-flex justify-content-between align-items-center"
            >
              <div style={{ marginLeft: "10px" }}>{item.content}</div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTarea(item.id)}
                >
                  🚫
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                >
                  👆
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => moveDown(index)}
                  disabled={index === List.length - 1}
                >
                  👇
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
