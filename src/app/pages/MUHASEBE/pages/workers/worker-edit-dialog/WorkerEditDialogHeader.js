import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function WorkerEditDialogHeader({ id }) {
  // Workers Redux state
  const { workerForEdit, actionsLoading } = useSelector(
    (state) => ({
      workerForEdit: state.workers.workerForEdit,
      actionsLoading: state.workers.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({ id: "WORKERS.NEW" });
    if (workerForEdit && id) {
      _title = `Edit worker '${workerForEdit.firstName} ${workerForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [workerForEdit, actionsLoading]);
  const intl = useIntl();

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
