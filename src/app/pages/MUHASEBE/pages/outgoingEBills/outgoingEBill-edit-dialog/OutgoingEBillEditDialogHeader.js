import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function OutgoingEBillEditDialogHeader({ id }) {
  // OutgoingEBills Redux state
  const { outgoingEBillForEdit, actionsLoading } = useSelector(
    (state) => ({
      outgoingEBillForEdit: state.outgoingEBills.outgoingEBillForEdit,
      actionsLoading: state.outgoingEBills.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Personel";
    if (outgoingEBillForEdit && id) {
      _title = `Personeli Düzenle  '${outgoingEBillForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [outgoingEBillForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
