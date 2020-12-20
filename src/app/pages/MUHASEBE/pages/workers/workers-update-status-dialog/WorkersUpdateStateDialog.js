import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  WorkerStatusCssClasses,
  WorkerStatusTitles,
} from "../WorkersUIHelpers";
import * as actions from "../../../_redux/workers/workersActions";
import { useWorkersUIContext } from "../WorkersUIContext";

const selectedWorkers = (entities, ids) => {
  const _workers = [];
  ids.forEach((id) => {
    const worker = entities.find((el) => el.id === id);
    if (worker) {
      _workers.push(worker);
    }
  });
  return _workers;
};

export function WorkersUpdateStateDialog({ show, onHide }) {
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
  const { workers, isLoading } = useSelector(
    (state) => ({
      workers: selectedWorkers(state.workers.entities, workersUIProps.ids),
      isLoading: state.workers.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!workersUIProps.ids || workersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workersUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update workers status by selected ids
    dispatch(actions.updateWorkersStatus(workersUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchWorkers(workersUIProps.queryParams)).then(() => {
          // clear selections list
          workersUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected workers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>BILL</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={`id${worker.id}`}>
                <td>{worker.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      WorkerStatusCssClasses[worker.status]
                    } label-inline`}
                  >
                    {" "}
                    {WorkerStatusTitles[worker.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {worker.lastName}, {worker.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
