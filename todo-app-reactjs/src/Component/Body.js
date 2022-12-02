import React, { useEffect, useState } from "react";
import Task from "./Task";
import DialogInputTask from "./DialogInputTask";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";
import { cloneDeep } from "lodash";

export const mode = {
  ALL_MODE: "All",
  COMPLETE_MODE: "Complete",
  INCOMPLETE_MODE: "InComplete",
};

export const statuses = {
  COMPLETE_STATUS: "Complete",
  INCOMPLETE_STATUS: "Incomplete",
};

export default function Body() {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const [editOption, setEditOption] = useState({
    isEditOption: false,
    editElement: {},
  });

  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   name: "task 1",
    //   date: Date.now(),
    //   status: statuses.INCOMPLETE_STATUS,
    // },
    // {
    //   id: 2,
    //   name: "task 2",
    //   date: Date.now(),
    //   status: statuses.INCOMPLETE_STATUS,
    // },
    // {
    //   id: 3,
    //   name: "task 3",
    //   date: Date.now(),
    //   status: statuses.INCOMPLETE_STATUS,
    // },
  ]);

  const [currMode, setCurrMode] = useState(mode.ALL_MODE);

  function openDialog() {
    setIsShowDialog(true);
  }

  function closeDialog() {
    setIsShowDialog(false);

    if (editOption.isEditOption) deactiveEditMode();
  }

  function addTask(title, status) {
    let currTasks = cloneDeep(tasks);
    let idMax = 0;

    if (currTasks.length > 0)
      idMax = currTasks.reduce((acc, val) => {
        return acc > val ? acc : val;
      }).id;

    let newTask = {
      id: idMax + 1,
      name: title,
      date: Date.now(),
      status: status,
    };
    currTasks.push(newTask);

    setTasks(currTasks);

    closeDialog();
  }

  useEffect(() => {
    console.log("tasks change: ?", tasks);
  }, [tasks]);

  function editTask(id, name, status) {
    let currTasks = cloneDeep(tasks);
    let newTask = currTasks.find((e) => e.id === id);

    newTask.name = name;
    newTask.status = status;

    setTasks(currTasks);

    closeDialog();
  }
  function onSelectTask(id, value) {
    let currTasks = cloneDeep(tasks);
    let elm = currTasks.find((o) => o.id === id);

    elm.status = value ? statuses.COMPLETE_STATUS : statuses.INCOMPLETE_STATUS;

    setTasks(currTasks);
  }

  function onDeleteTask(id) {
    let currTasks = cloneDeep(tasks).filter((o) => o.id !== id);

    setTasks(currTasks);
  }

  function activeEditMode(task) {
    setIsShowDialog(true);

    setEditOption({
      isEditOption: true,
      editElement: task,
    });
  }

  function deactiveEditMode() {
    setEditOption({
      isEditOption: false,
      editElement: {},
    });
  }

  function onChangeMode(objectValue) {
    setCurrMode(objectValue.value);
  }

  const filter = {
    [mode.COMPLETE_MODE]: (item) => item.status === statuses.COMPLETE_STATUS,
    [mode.INCOMPLETE_MODE]: (item) =>
      item.status === statuses.INCOMPLETE_STATUS,
    [mode.ALL_MODE]: () => true,
  };

  const newTasks = tasks.filter(filter[currMode]);

  return (
    <div style={{ padding: 20 }}>
      <button
        style={{ width: 100, height: 40, marginBottom: 20 }}
        onClick={openDialog}
      >
        Add Task
      </button>
      <div style={{ width: 150 }}>
        <Dropdown
          options={Object.values(mode)}
          value={currMode}
          onChange={onChangeMode}
        />
      </div>

      {isShowDialog && (
        <DialogInputTask
          buttonText={editOption.isEditOption ? "Update Task" : "Add"}
          headerText={editOption.isEditOption ? "Update Task" : "Add Task"}
          editTask={editTask}
          addTask={addTask}
          editOption={editOption}
          openDialog={openDialog}
          closeDialog={closeDialog}
        ></DialogInputTask>
      )}

      <div style={{ marginTop: 50 }}>
        {newTasks.length > 0 ? (
          newTasks.map((e) => (
            <Task
              onDeleteTask={onDeleteTask}
              onSelectTask={onSelectTask}
              key={e.id}
              task={e}
              activeEditMode={activeEditMode}
            ></Task>
          ))
        ) : (
          <div
            style={{
              height: 50,
              width: 340,
              padding: 20,
              background: "#BC8F8F",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Todo Found
          </div>
        )}
      </div>
    </div>
  );
}
