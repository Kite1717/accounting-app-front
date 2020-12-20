import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function OutlayEditDialogHeader({ id }) {
  // Outlays Redux state
  const { outlayForEdit, actionsLoading } = useSelector(
    (state) => ({
      outlayForEdit: state.outlays.outlayForEdit,
      actionsLoading: state.outlays.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Outlay";
    if (outlayForEdit && id) {
      _title = `Edit outlay '${outlayForEdit.firstName} ${outlayForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [outlayForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
