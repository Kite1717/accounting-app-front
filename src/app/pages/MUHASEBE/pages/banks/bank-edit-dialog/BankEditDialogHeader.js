import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function BankEditDialogHeader({ id }) {
  // Banks Redux state
  const { bankForEdit, actionsLoading } = useSelector(
    (state) => ({
      bankForEdit: state.banks.bankForEdit,
      actionsLoading: state.banks.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Banka";
    if (bankForEdit && id) {
      _title = `Bankayı Düzenle '${bankForEdit.firstName} ${bankForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [bankForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
