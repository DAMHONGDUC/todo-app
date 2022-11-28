"use strict";
import React, { Component } from "react";
import Task from "./Task";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import Combobox from "react-widgets/Combobox";

let statuses = [
  { id: 0, name: "Complete" },
  { id: 1, name: "Incomplate" },
];

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
          isChecked: false,
        },
      ],
      valueCombobox: 1,
    };
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

  addTask() {
    let newTask = {
      id: this.state.tasks.length + 1,
      name: this.state.valueTitle,
      date: Date.now(),
      isChecked: false,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
    });

    this.closeDialog();
  }

  handleChangeTitle(event) {
    this.setState({ valueTitle: event.target.value });
  }

  handleChangeCombobox(value) {
    this.setState({ valueCombobox: value.id });
  }

  onSelectTask(id, value) {
    let newTasks = this.state.tasks;
    let elm = newTasks.find((o) => o.id === id);
    elm.isChecked = value;

    this.setState({
      tasks: newTasks,
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.openDialog()}>Add</button>
        {this.state.isShowDialog && (
          <>
            <ReactDialogBox
              closeBox={() => this.closeDialog()}
              modalWidth="60%"
              headerBackgroundColor="red"
              headerTextColor="white"
              headerHeight="65"
              closeButtonColor="white"
              bodyBackgroundColor="white"
              bodyTextColor="black"
              bodyHeight="200px"
              headerText="Add Task"
            >
              <div>
                <div>Title</div>
                <input
                  onChange={(event) => this.handleChangeTitle(event)}
                ></input>

                <div style={{ marginTop: 20 }}>Status</div>
                <div>
                  <Combobox
                    data={statuses}
                    dataKey="id"
                    textField="name"
                    defaultValue={1}
                    onChange={(value) => this.handleChangeCombobox(value)}
                  />
                </div>

                <div style={{ marginTop: 50 }}>
                  <button onClick={() => this.addTask()}>Add</button>
                  <button>Cancel</button>
                </div>
              </div>
            </ReactDialogBox>
          </>
        )}
        <div>
          {this.state.tasks.map((e) => (
            <Task
              onSelectTask={(id, value) => this.onSelectTask(id, value)}
              key={e.id}
              task={e}
            ></Task>
          ))}
        </div>
      </div>
    );
  }
}
