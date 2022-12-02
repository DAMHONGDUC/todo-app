import React, { useState } from "react";
import { ReactDialogBox } from "react-js-dialog-box";
import Dropdown from "react-dropdown";
import "react-js-dialog-box/dist/index.css";
import "react-dropdown/style.css";
import PropTypes from "prop-types";
import { statuses } from "./Body";

export default function DialogInputTask({
  closeDialog,
  headerText,
  buttonText,
  editOption,
  editTask,
  addTask,
}) {
  const { isEditOption, editElement } = editOption;

  const [valueTitle, setValueTitle] = useState(
    editOption.isEditOption ? editOption.editElement.name : ""
  );
  const [status, setStatus] = useState(
    editOption.isEditOption
      ? editOption.editElement.status
      : statuses.INCOMPLETE_STATUS
  );

  function handleChangeTitle(event) {
    setValueTitle(event.target.value);
  }

  function handleChangeCombobox(objectValue) {
    setStatus(objectValue.value);
  }

  return (
    <ReactDialogBox
      closeBox={closeDialog}
      modalWidth="60%"
      headerBackgroundColor="red"
      headerTextColor="white"
      headerHeight="65"
      closeButtonColor="white"
      bodyBackgroundColor="white"
      bodyTextColor="black"
      bodyHeight="200px"
      headerText={headerText}
    >
      <div>
        <div>Title</div>
        <input
          style={{ width: 400, height: 30 }}
          onChange={(event) => handleChangeTitle(event)}
          defaultValue={valueTitle}
        ></input>

        <div style={{ marginTop: 20 }}>Status</div>
        <div>
          <Dropdown
            options={Object.values(statuses)}
            value={
              isEditOption ? editElement.status : statuses.INCOMPLETE_STATUS
            }
            onChange={(objectValue) => handleChangeCombobox(objectValue)}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <button
            style={{ width: 100, height: 40, marginRight: 20 }}
            onClick={() =>
              isEditOption
                ? editTask(editElement.id, valueTitle, status)
                : addTask(valueTitle, status)
            }
          >
            {buttonText}
          </button>
          <button style={{ width: 100, height: 40 }} onClick={closeDialog}>
            Cancel
          </button>
        </div>
      </div>
    </ReactDialogBox>
  );
}

DialogInputTask.propTypes = {
  closeDialog: PropTypes.func,
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  editOption: PropTypes.object,
  editTask: PropTypes.func,
  addTask: PropTypes.func,
};
