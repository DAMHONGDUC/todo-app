import React from "react";
import { ReactDialogBox } from "react-js-dialog-box";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";
import PropTypes from "prop-types";

export const statuses = [
  { value: 0, label: "Complete" },
  { value: 1, label: "Incomplate" },
];

const INCOMPLATE_VALUE = 1;

export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valueTitle: "", status: INCOMPLATE_VALUE };
  }

  handleChangeTitle(event) {
    this.setState({ valueTitle: event.target.value });
  }

  handleChangeCombobox(objectValue) {
    this.setState({ status: objectValue.value });
  }

  render() {
    return (
      <ReactDialogBox
        closeBox={this.props.closeDialog}
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
            style={{ width: 400, height: 30 }}
            onChange={(event) => this.handleChangeTitle(event)}
          ></input>

          <div style={{ marginTop: 20 }}>Status</div>
          <div>
            <Dropdown
              options={statuses}
              value={statuses.find((e) => e.value === INCOMPLATE_VALUE).label}
              onChange={(objectValue) => this.handleChangeCombobox(objectValue)}
            />
          </div>
          <div style={{ marginTop: 40 }}>
            <button
              style={{ width: 60, height: 30, marginRight: 20 }}
              onClick={() =>
                this.props.addTask(this.state.valueTitle, this.state.status)
              }
            >
              Add
            </button>
            <button
              style={{ width: 60, height: 30 }}
              onClick={this.props.closeDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </ReactDialogBox>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
};
