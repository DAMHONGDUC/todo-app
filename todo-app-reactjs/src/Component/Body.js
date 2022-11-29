"use strict";
import React, { Component } from "react";
import Task from "./Task";
import DialogInputTask from "./DialogInputTask";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";

export const mode = [
  { value: 0, label: "All" },
  { value: 1, label: "Complete" },
  { value: 2, label: "Incomplete" },
];

export const statuses = [
  { value: 0, label: "Complete" },
  { value: 1, label: "Incomplete" },
];

const ALL_MODE = 0;
const COMPLETE_MODE = 1;
const INCOMPLETE_MODE = 2;

export const INCOMPLETE_STATUS = 1;
export const COMPLETE_STATUS = 0;

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowDialog: false,
      editOption: {
        isEditOption: false,
        editElement: {},
      },
      tasks: [
        {
          id: 1,
          name: "task 1",
          date: Date.now(),
          status: 1,
        },
        {
          id: 2,
          name: "task 2",
          date: Date.now(),
          status: 0,
        },
        {
          id: 3,
          name: "task 3",
          date: Date.now(),
          status: 1,
        },
      ],
      currMode: ALL_MODE,
    };

    this.onSelectTask = this.onSelectTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.activeEditMode = this.activeEditMode.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  openDialog = () => {
    this.setState({
      isShowDialog: true,
    });
  };

  closeDialog = () => {
    this.setState({
      isShowDialog: false,
    });

    if (this.state.editOption.isEditOption) this.deactiveEditMode();
  };

  addTask(title, status) {
    let tasks = this.state.tasks;
    let idMax = tasks.reduce((acc, val) => {
      return acc > val ? acc : val;
    }).id;

    let newTask = {
      id: idMax + 1,
      name: title,
      date: Date.now(),
      status: status,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
    });

    this.closeDialog();
  }

  componentDidUpdate() {
    console.log("");
    this.state.tasks.map((e) => console.log(e));
  }

  editTask(id, name, status) {
    let newTasks = this.state.tasks;
    let currTask = newTasks.find((e) => e.id === id);

    currTask.name = name;
    currTask.status = status;

    this.setState({
      tasks: [...newTasks],
    });

    this.closeDialog();
  }

  onSelectTask(id, value) {
    let newTasks = this.state.tasks;
    let elm = newTasks.find((o) => o.id === id);
    elm.status = value === true ? COMPLETE_STATUS : INCOMPLETE_STATUS;

    this.setState({
      tasks: newTasks,
    });
  }

  onDeleteTask(id) {
    let tasks = this.state.tasks;
    let newTasks = tasks.filter((o) => o.id !== id);

    this.setState({
      tasks: newTasks,
    });
  }

  activeEditMode(task) {
    this.setState({
      isShowDialog: true,
      editOption: {
        isEditOption: true,
        editElement: task,
      },
    });
  }

  deactiveEditMode() {
    this.setState({
      editOption: {
        isEditOption: false,
        editElement: {},
      },
    });
  }

  onChangeMode(objectValue) {
    this.setState({
      currMode: objectValue.value,
    });
  }

  render() {
    let ListTasks = this.state.tasks;
    if (this.state.currMode === COMPLETE_MODE) {
      ListTasks = this.state.tasks.filter((e) => e.status === COMPLETE_STATUS);
    } else if (this.state.currMode === INCOMPLETE_MODE) {
      ListTasks = this.state.tasks.filter(
        (e) => e.status === INCOMPLETE_STATUS
      );
    }

    console.log({ ListTasks });

    return (
      <div style={{ padding: 20 }}>
        <button
          style={{ width: 100, height: 40, marginBottom: 20 }}
          onClick={() => this.openDialog()}
        >
          Add Task
        </button>
        <div style={{ width: 150 }}>
          <Dropdown
            options={mode}
            value={mode.find((e) => e.value === ALL_MODE).label}
            onChange={(objectValue) => this.onChangeMode(objectValue)}
          />
        </div>

        {this.state.isShowDialog && (
          <DialogInputTask
            buttonText={
              this.state.editOption.isEditOption === true
                ? "Update Task"
                : "Add"
            }
            headerText={
              this.state.editOption.isEditOption === true
                ? "Update Task"
                : "Add Task"
            }
            editTask={this.editTask}
            addTask={this.addTask}
            editOption={this.state.editOption}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
          ></DialogInputTask>
        )}

        <div style={{ marginTop: 50 }}>
          {ListTasks.length > 0 ? (
            ListTasks.map((e) => (
              <Task
                onDeleteTask={this.onDeleteTask}
                onSelectTask={this.onSelectTask}
                key={e.id}
                task={e}
                activeEditMode={this.activeEditMode}
              ></Task>
            ))
          ) : (
            <div
              style={{ padding: 20, background: "#BC8F8F", marginBottom: 20 }}
            >
              {" "}
              No Todo Found
            </div>
          )}
        </div>
      </div>
    );
  }
}
