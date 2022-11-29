import React from "react";
import { ReactDialogBox } from "react-js-dialog-box";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";
import PropTypes from "prop-types";
import { statuses } from "./Body";

export default class DialogInputTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTitle:
        this.props.editOption.isEditOption === true
          ? this.props.editOption.editElement.name
          : "",
      status:
        this.props.editOption.isEditOption === true
          ? this.props.editOption.editElement.status
          : statuses.INCOMPLETE_STATUS,
    };
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
        headerText={this.props.headerText}
      >
        <div>
          <div>Title</div>
          <input
            style={{ width: 400, height: 30 }}
            onChange={(event) => this.handleChangeTitle(event)}
            defaultValue={this.state.valueTitle}
          ></input>

          <div style={{ marginTop: 20 }}>Status</div>
          <div>
            <Dropdown
              options={Object.values(statuses)}
              value={statuses.INCOMPLETE_STATUS}
              onChange={(objectValue) => this.handleChangeCombobox(objectValue)}
            />
          </div>
          <div style={{ marginTop: 40 }}>
            <button
              style={{ width: 100, height: 40, marginRight: 20 }}
              onClick={() =>
                this.props.editOption.isEditOption
                  ? this.props.editTask(
                      this.props.editOption.editElement.id,
                      this.state.valueTitle,
                      this.state.status
                    )
                  : this.props.addTask(this.state.valueTitle, this.state.status)
              }
            >
              {this.props.buttonText}
            </button>
            <button
              style={{ width: 100, height: 40 }}
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

DialogInputTask.propTypes = {
  onComplete: PropTypes.func,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  editOption: PropTypes.object,
  editTask: PropTypes.func,
  addTask: PropTypes.func,
};
