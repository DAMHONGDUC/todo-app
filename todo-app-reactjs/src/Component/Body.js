"use strict";
import React, { Component } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
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
  };

  addTask(title, status) {
    let newTask = {
      id: this.state.tasks.length + 1,
      name: title,
      date: Date.now(),
      status: status,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
    });

    console.log(newTask);
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
          <AddTask
            addTask={this.addTask}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
          ></AddTask>
        )}

        <div style={{ marginTop: 50 }}>
          {ListTasks.length > 0 ? (
            ListTasks.map((e) => (
              <Task
                onDeleteTask={this.onDeleteTask}
                onSelectTask={this.onSelectTask}
                key={e.id}
                task={e}
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
