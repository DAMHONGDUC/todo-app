import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "react-widget-checkbox";
import "react-widget-checkbox/style";
import { statuses } from "./Body";

export default class Task extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { task } = this.props;

    let datetime = new Date(task.date).toLocaleString("en-US");
    return (
      <table style={{ padding: 20, background: "#BC8F8F", marginBottom: 20 }}>
        <tr>
          <td>
            <Checkbox
              style={{ marginRight: 10 }}
              onChange={(value) => this.props.onSelectTask(task.id, value)}
              checked={task.status === statuses.COMPLETE_STATUS ? true : false}
            ></Checkbox>
          </td>
          <td>{task.name}</td>
          <td>
            <button
              onClick={() => this.props.activeEditMode(task)}
              style={{ marginLeft: 100, width: 50 }}
            >
              edit
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label style={{ fontSize: 13 }}>{datetime}</label>
          </td>
          <td>
            <button
              onClick={() => this.props.onDeleteTask(task.id)}
              style={{ marginLeft: 100, width: 50 }}
            >
              delete
            </button>
          </td>
        </tr>
      </table>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object,
  onSelectTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  activeEditMode: PropTypes.func,
};
