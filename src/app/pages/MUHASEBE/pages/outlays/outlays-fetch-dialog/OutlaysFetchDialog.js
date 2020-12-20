import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  OutlayStatusCssClasses,
  OutlayStatusTitles,
} from "../OutlaysUIHelpers";
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

export function OutlaysFetchDialog({ show, onHide }) {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      ids: outlaysUIContext.ids,
    };
  }, [outlaysUIContext]);

  // Outlays Redux state
  const { outlays } = useSelector(
    (state) => ({
      outlays: selectedOutlays(state.outlays.entities, outlaysUIProps.ids),
    }),
    shallowEqual
  );

  // if outlays weren't selected we should close modal
  useEffect(() => {
    if (!outlaysUIProps.ids || outlaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlaysUIProps.ids]);

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
