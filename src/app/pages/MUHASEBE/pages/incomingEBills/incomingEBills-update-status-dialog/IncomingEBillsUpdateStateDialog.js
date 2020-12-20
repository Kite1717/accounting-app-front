import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  IncomingEBillStatusCssClasses,
  IncomingEBillStatusTitles,
} from "../IncomingEBillsUIHelpers";
import * as actions from "../../../_redux/incomingEBills/incomingEBillsActions";
import { useIncomingEBillsUIContext } from "../IncomingEBillsUIContext";

const selectedIncomingEBills = (entities, ids) => {
  const _incomingEBills = [];
  ids.forEach((id) => {
    const incomingEBill = entities.find((el) => el.id === id);
    if (incomingEBill) {
      _incomingEBills.push(incomingEBill);
    }
  });
  return _incomingEBills;
};

export function IncomingEBillsUpdateStateDialog({ show, onHide }) {
  // IncomingEBills UI Context
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      ids: incomingEBillsUIContext.ids,
      setIds: incomingEBillsUIContext.setIds,
      queryParams: incomingEBillsUIContext.queryParams,
    };
  }, [incomingEBillsUIContext]);

  // IncomingEBills Redux state
  const { incomingEBills, isLoading } = useSelector(
    (state) => ({
      incomingEBills: selectedIncomingEBills(
        state.incomingEBills.entities,
        incomingEBillsUIProps.ids
      ),
      isLoading: state.incomingEBills.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!incomingEBillsUIProps.ids || incomingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingEBillsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update incomingEBills status by selected ids
    dispatch(actions.updateIncomingEBillsStatus(incomingEBillsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchIncomingEBills(incomingEBillsUIProps.queryParams)).then(
          () => {
            // clear selections list
            incomingEBillsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
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
          Status has been updated for selected incomingEBills
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
              <th>INCOMINGEBILL</th>
            </tr>
          </thead>
          <tbody>
            {incomingEBills.map((incomingEBill) => (
              <tr key={`id${incomingEBill.id}`}>
                <td>{incomingEBill.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      IncomingEBillStatusCssClasses[incomingEBill.status]
                      } label-inline`}
                  >
                    {" "}
                    {IncomingEBillStatusTitles[incomingEBill.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {incomingEBill.lastName}, {incomingEBill.firstName}
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
