/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

function App() {
  let [task, setTask] = useState("");
  let [taskError, setTaskError] = useState("");
  let [allTask, setAllTask] = useState([]);
  let [editModale, setEditModale] = useState(false);
  let [updatedTask, setUpdatedTask] = useState();
  let [id, setId] = useState(null);
  let [updateError, setUpdateError] = useState("");

  const db = getDatabase();

  let handleText = (e) => {
    setTask(e.target.value);
    setTaskError("");
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      setTaskError("Input is Required");
    } else {
      set(push(ref(db, "todoList/")), {
        name: task,
      })
        .then(() => {
          alert("Data send Succesfully");
          setTask("");
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    const todoListRef = ref(db, "todoList/");
    onValue(todoListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setAllTask(array);
    });
  }, []);

  let handleRemooveList = (e, id) => {
    e.preventDefault();
    remove(ref(db, "todoList/" + id));
  };

  let handleEditModal = (e, id) => {
    e.preventDefault();
    setEditModale(true);
    setId(id);
  };
  let handleUpdate = () => {
    if (!updatedTask) {
      setUpdateError("Please Enter a Value");
    }

    update(ref(db, "todoList/" + id), {
      name: updatedTask,
    });
    setUpdateError("");
  };
  return (
    <>
      <div className="container mx-auto my-10 bg-gray-700">
        <h1 className=" pt-5 text-center text-fuchsia-600	 text-3xl font-semibold mb-4">
          To Do List
        </h1>
        <div className="md:w-1/2 mx-auto">
          <div className=" relative shadow-2xl shadow-black rounded-lg p-6 bg-slate-700 ">
            <form>
              <div className="flex mb-4">
                <input
                  value={task}
                  onChange={handleText}
                  type="text"
                  className="w-full px-4 py-2 mr-2 
                        border-2 rounded-xl border-teal-400 focus:outline-none
                        focus:border-blue-500"
                  id="todo-input"
                  placeholder="Add new task"
                  required=""
                />
                <button
                  onClick={handleSubmit}
                  className="btn btn-outline btn-accent"
                >
                  Add
                </button>
              </div>
              {taskError && <p className="text-red-600">{taskError}</p>}

              <ul className="text-teal-300 font-extralight ">
                {allTask.map((item, index) => {
                  return (
                    <li className=" flex justify-between mt-2">
                      <div>
                        <span className="mr-2">{index + 1}.</span>
                        {item.name}
                      </div>

                      <div>
                        <button
                          onClick={(e) => {
                            handleRemooveList(e, item.id);
                          }}
                          className="btn btn-active btn-secondary mr-2 "
                        >
                          Remove
                        </button>
                        <button
                          onClick={(e) => handleEditModal(e, item.id)}
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </form>
            <ul id="todo-list">{/* Tasks will be added here dynamically */}</ul>
          </div>
          {editModale && (
            <div className="font-serif absolute top-28 w-[47%] h-[250px] shadow-2xl shadow-black rounded-lg p-6 bg-slate-700">
              <input
                onChange={(e) => {
                  setUpdatedTask(e.target.value);
                  setUpdateError("");
                }}
                type="text"
                className="w-full  px-4 py-2 mr-2 
                          border-2 rounded-xl border-teal-400 focus:outline-none
                          focus:border-blue-500"
                id="todo-input"
                placeholder="Add new task"
                required=""
              />
              {updateError && <p className="text-red-600">{updateError}</p>}
              <button onClick={handleUpdate} className="btn mt-2 mr-2 btn-info">
                Update
              </button>
              <button
                onClick={() => setEditModale(false)}
                className="btn btn-active btn-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
