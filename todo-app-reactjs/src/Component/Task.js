import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "react-widget-checkbox";
import "react-widget-checkbox/style";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let datetime = new Date(this.props.task.date).toLocaleString("en-US");
    return (
      <div style={{ marginTop: 20 }}>
        <div>
          <Checkbox
            onChange={(value) =>
              this.props.onSelectTask(this.props.task.id, value)
            }
            defaultChecked={false}
          ></Checkbox>
        </div>

        <p>{this.props.task.name}</p>
        <p>{datetime}</p>
      </div>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object,
  onSelectTask: PropTypes.func,
};
