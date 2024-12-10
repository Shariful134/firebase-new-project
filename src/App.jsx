import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";

function App() {
  let [task, setTask] = useState("");
  let [taskError, setTaskError] = useState("");

  let handleText = (e) => {
    setTask(e.target.value);
    setTaskError("");
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      setTaskError("Input is Required");
    } else {
      const db = getDatabase();
      set(push(ref(db, "todoList/")), {
        nmae: task,
      })
        .then(() => {
          alert("Data send Succesfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="container mx-auto my-10 bg-gray-700">
        <h1 className=" pt-5 text-center text-green-500 text-3xl font-semibold mb-4">
          To Do List
        </h1>
        <div className="md:w-1/2 mx-auto">
          <div className=" shadow-md rounded-lg p-6">
            <form id="todo-form">
              <div className="flex mb-4">
                <input
                  onChange={handleText}
                  type="text"
                  className="w-full px-4 py-2 mr-2 
                        border-2 rounded-xl border-emerald-500 focus:outline-none
                        focus:border-blue-500"
                  id="todo-input"
                  placeholder="Add new task"
                  required=""
                />
                <button
                  onClick={handleSubmit}
                  className="text-green-500 border-2 rounded-xl border-emerald-500  
                       font-bold py-2 px-4"
                >
                  Add
                </button>
              </div>
              {taskError && <p className="text-red-600">{taskError}</p>}
            </form>
            <ul id="todo-list">{/* Tasks will be added here dynamically */}</ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
