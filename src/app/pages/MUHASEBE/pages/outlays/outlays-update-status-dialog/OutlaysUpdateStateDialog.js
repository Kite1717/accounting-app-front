import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  OutlayStatusCssClasses,
  OutlayStatusTitles,
} from "../OutlaysUIHelpers";
import * as actions from "../../../_redux/outlays/outlaysActions";
import { useOutlaysUIContext } from "../OutlaysUIContext";

const selectedOutlays = (entities, ids) => {
  const _outlays = [];
  ids.forEach((id) => {
    const outlay = entities.find((el) => el.id === id);
    if (outlay) {
      _outlays.push(outlay);
    }
  });
  return _outlays;
};

export function OutlaysUpdateStateDialog({ show, onHide }) {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      ids: outlaysUIContext.ids,
      setIds: outlaysUIContext.setIds,
      queryParams: outlaysUIContext.queryParams,
    };
  }, [outlaysUIContext]);

  // Outlays Redux state
  const { outlays, isLoading } = useSelector(
    (state) => ({
      outlays: selectedOutlays(state.outlays.entities, outlaysUIProps.ids),
      isLoading: state.outlays.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!outlaysUIProps.ids || outlaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlaysUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update outlays status by selected ids
    dispatch(actions.updateOutlaysStatus(outlaysUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchOutlays(outlaysUIProps.queryParams)).then(() => {
          // clear selections list
          outlaysUIProps.setIds([]);
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
          Status has been updated for selected outlays
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
            {outlays.map((outlay) => (
              <tr key={`id${outlay.id}`}>
                <td>{outlay.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      OutlayStatusCssClasses[outlay.status]
                    } label-inline`}
                  >
                    {" "}
                    {OutlayStatusTitles[outlay.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {outlay.lastName}, {outlay.firstName}
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
