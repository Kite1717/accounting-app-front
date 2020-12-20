import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  WorkerStatusCssClasses,
  WorkerStatusTitles,
} from "../WorkersUIHelpers";
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

export function WorkersFetchDialog({ show, onHide }) {
  // Workers UI Context
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      ids: workersUIContext.ids,
    };
  }, [workersUIContext]);

  // Workers Redux state
  const { workers } = useSelector(
    (state) => ({
      workers: selectedWorkers(state.workers.entities, workersUIProps.ids),
    }),
    shallowEqual
  );

  // if workers weren't selected we should close modal
  useEffect(() => {
    if (!workersUIProps.ids || workersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workersUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
