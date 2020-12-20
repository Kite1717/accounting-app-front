import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function OutlayDocumentEditDialogHeader({ id }) {
  // OutlayDocuments Redux state
  const { outlayDocumentForEdit, actionsLoading } = useSelector(
    (state) => ({
      outlayDocumentForEdit: state.outlayDocuments.outlayDocumentForEdit,
      actionsLoading: state.outlayDocuments.actionsLoading,
    }),
    shallowEqual
  );
  const intl = useIntl();

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({ id: "OUTLAY.DOCUMENTS.NEW" });
    if (outlayDocumentForEdit && id) {
      _title = `Edit outlayDocument '${outlayDocumentForEdit.firstName} ${outlayDocumentForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [outlayDocumentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
