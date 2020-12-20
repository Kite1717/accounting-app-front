import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  OutgoingEBillStatusCssClasses,
  OutgoingEBillStatusTitles,
} from "../OutgoingEBillsUIHelpers";
import * as actions from "../../../_redux/outgoingEBills/outgoingEBillsActions";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";

const selectedOutgoingEBills = (entities, ids) => {
  const _outgoingEBills = [];
  ids.forEach((id) => {
    const outgoingEBill = entities.find((el) => el.id === id);
    if (outgoingEBill) {
      _outgoingEBills.push(outgoingEBill);
    }
  });
  return _outgoingEBills;
};

export function OutgoingEBillsUpdateStateDialog({ show, onHide }) {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      ids: outgoingEBillsUIContext.ids,
      setIds: outgoingEBillsUIContext.setIds,
      queryParams: outgoingEBillsUIContext.queryParams,
    };
  }, [outgoingEBillsUIContext]);

  // OutgoingEBills Redux state
  const { outgoingEBills, isLoading } = useSelector(
    (state) => ({
      outgoingEBills: selectedOutgoingEBills(
        state.outgoingEBills.entities,
        outgoingEBillsUIProps.ids
      ),
      isLoading: state.outgoingEBills.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!outgoingEBillsUIProps.ids || outgoingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoingEBillsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update outgoingEBills status by selected ids
    dispatch(actions.updateOutgoingEBillsStatus(outgoingEBillsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchOutgoingEBills(outgoingEBillsUIProps.queryParams)).then(
          () => {
            // clear selections list
            outgoingEBillsUIProps.setIds([]);
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
          Status has been updated for selected outgoingEBills
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
              <th>OUTGOINGEBILL</th>
            </tr>
          </thead>
          <tbody>
            {outgoingEBills.map((outgoingEBill) => (
              <tr key={`id${outgoingEBill.id}`}>
                <td>{outgoingEBill.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      OutgoingEBillStatusCssClasses[outgoingEBill.status]
                      } label-inline`}
                  >
                    {" "}
                    {OutgoingEBillStatusTitles[outgoingEBill.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {outgoingEBill.lastName}, {outgoingEBill.firstName}
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
