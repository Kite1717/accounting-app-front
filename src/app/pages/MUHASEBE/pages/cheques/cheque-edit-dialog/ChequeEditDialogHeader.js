import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ChequeEditDialogHeader({ id }) {
  // Cheques Redux state
  const { chequeForEdit, actionsLoading } = useSelector(
    (state) => ({
      chequeForEdit: state.cheques.chequeForEdit,
      actionsLoading: state.cheques.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Cheque";
    if (chequeForEdit && id) {
      _title = `Edit cheque '${chequeForEdit.firstName} ${chequeForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [chequeForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
