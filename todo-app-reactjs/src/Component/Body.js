import React, { Component } from "react";
import Task from "./Task";
import DialogInputTask from "./DialogInputTask";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";

export const mode = {
  ALL_MODE: "All",
  COMPLETE_MODE: "Complete",
  INCOMPLETE_MODE: "InComplete",
};

export const statuses = {
  COMPLETE_STATUS: "Complete",
  INCOMPLETE_STATUS: "Incomplete",
};

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
        //   status: statuses.COMPLETE_STATUS,
        // },
        // {
        //   id: 3,
        //   name: "task 3",
        //   date: Date.now(),
        //   status: statuses.INCOMPLETE_STATUS,
        // },
      ],
      currMode: mode.ALL_MODE,
    };

    this.onSelectTask = this.onSelectTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.activeEditMode = this.activeEditMode.bind(this);
    this.editTask = this.editTask.bind(this);
    this.onChangeMode = this.onChangeMode.bind(this);
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

    let idMax = 0;
    if (tasks.length > 0)
      idMax = tasks.reduce((acc, val) => {
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
    elm.status = value ? statuses.COMPLETE_STATUS : statuses.INCOMPLETE_STATUS;

    this.setState({
      tasks: [...newTasks],
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
    const { currMode, tasks } = this.state;
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
          onClick={() => this.openDialog()}
        >
          Add Task
        </button>
        <div style={{ width: 150 }}>
          <Dropdown
            options={Object.values(mode)}
            value={this.state.currMode}
            onChange={this.onChangeMode}
          />
        </div>

        {this.state.isShowDialog && (
          <DialogInputTask
            buttonText={
              this.state.editOption.isEditOption ? "Update Task" : "Add"
            }
            headerText={
              this.state.editOption.isEditOption ? "Update Task" : "Add Task"
            }
            editTask={this.editTask}
            addTask={this.addTask}
            editOption={this.state.editOption}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
          ></DialogInputTask>
        )}

        <div style={{ marginTop: 50 }}>
          {newTasks.length > 0 ? (
            newTasks.map((e) => (
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
}
