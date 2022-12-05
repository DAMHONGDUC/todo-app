import React from "react";
import PropTypes from "prop-types";
import "react-widget-checkbox/style";
import { statuses } from "./Body";

export default function Task({
  task,
  onSelectTask,
  activeEditMode,
  onDeleteTask,
}) {
  let datetime = new Date(task.date).toLocaleString("en-US");
  return (
    <table style={{ padding: 20, background: "#BC8F8F", marginBottom: 20 }}>
      <tbody>
        <tr>
          <td>
            <input
              type="checkbox"
              style={{ marginRight: 10, height: 30, width: 25 }}
              checked={task.status === statuses.COMPLETE_STATUS}
              onChange={(e) => onSelectTask(task.id, e.target.checked)}
            ></input>
          </td>
          <td>{task.name}</td>
          <td>
            <button
              onClick={() => activeEditMode(task)}
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
              onClick={() => onDeleteTask(task.id)}
              style={{ marginLeft: 100, width: 50 }}
            >
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  onSelectTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  activeEditMode: PropTypes.func,
};
