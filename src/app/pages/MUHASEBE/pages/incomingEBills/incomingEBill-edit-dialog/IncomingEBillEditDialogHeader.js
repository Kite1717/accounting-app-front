import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function IncomingEBillEditDialogHeader({ id }) {
  // IncomingEBills Redux state
  const { incomingEBillForEdit, actionsLoading } = useSelector(
    (state) => ({
      incomingEBillForEdit: state.incomingEBills.incomingEBillForEdit,
      actionsLoading: state.incomingEBills.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (incomingEBillForEdit && id) {
      _title = `Personeli Düzenle  '${incomingEBillForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [incomingEBillForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
