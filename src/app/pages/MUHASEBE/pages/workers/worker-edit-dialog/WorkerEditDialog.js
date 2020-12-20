import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workers/workersActions";
import { WorkerEditDialogHeader } from "./WorkerEditDialogHeader";
import { WorkerEditForm } from "./WorkerEditForm";
import { useWorkersUIContext } from "../WorkersUIContext";

export function WorkerEditDialog({ id, show, onHide }) {
  // Workers UI Context
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      initWorker: workersUIContext.initWorker,
    };
  }, [workersUIContext]);

  // Workers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, workerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.workers.actionsLoading,
      workerForEdit: state.workers.workerForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Worker by id
    dispatch(actions.fetchWorker(id));
  }, [id, dispatch]);

  // server request for saving worker
  const saveWorker = (worker) => {
    if (!id) {
      // server request for creating worker
      dispatch(actions.createWorker(worker)).then(() => onHide());
    } else {
      // server request for updating worker
      dispatch(actions.updateWorker(worker)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <WorkerEditDialogHeader id={id} />
      <WorkerEditForm
        saveWorker={saveWorker}
        actionsLoading={actionsLoading}
        worker={workerForEdit || workersUIProps.initWorker}
        onHide={onHide}
      />
    </Modal>
  );
}
