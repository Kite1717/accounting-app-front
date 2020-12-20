import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function BillEditDialogHeader({ id }) {
  // Bills Redux state
  const { billForEdit, actionsLoading } = useSelector(
    (state) => ({
      billForEdit: state.bills.billForEdit,
      actionsLoading: state.bills.actionsLoading,
    }),
    shallowEqual
  );

  const intl = useIntl();

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({ id: "BILLS.NEW" });
    if (billForEdit && id) {
      _title = `Edit bill '${billForEdit.firstName} ${billForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [billForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
