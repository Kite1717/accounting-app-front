import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CashEditDialogHeader({ id }) {
  // Cashes Redux state
  const { cashForEdit, actionsLoading } = useSelector(
    (state) => ({
      cashForEdit: state.cashes.cashForEdit,
      actionsLoading: state.cashes.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Cash";
    if (cashForEdit && id) {
      _title = `Edit cash '${cashForEdit.firstName} ${cashForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [cashForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
