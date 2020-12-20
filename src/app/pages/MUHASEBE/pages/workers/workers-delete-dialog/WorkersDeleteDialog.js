import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workers/workersActions";
import { useWorkersUIContext } from "../WorkersUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function WorkersDeleteDialog({ show, onHide }) {
  // Workers UI Context
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      ids: workersUIContext.ids,
      setIds: workersUIContext.setIds,
      queryParams: workersUIContext.queryParams,
    };
  }, [workersUIContext]);

  // Workers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.workers.actionsLoading }),
    shallowEqual
  );

  // if workers weren't selected we should close modal
  useEffect(() => {
    if (!workersUIProps.ids || workersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workersUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteWorkers = () => {
    // server request for deleting worker by selected ids
    dispatch(actions.deleteWorkers(workersUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchWorkers(workersUIProps.queryParams)).then(() => {
        // clear selections list
        workersUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Workers Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected workers?</span>
        )}
        {isLoading && <span>Worker are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteWorkers}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
