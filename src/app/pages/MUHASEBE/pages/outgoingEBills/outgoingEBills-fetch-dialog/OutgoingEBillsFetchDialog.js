import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  OutgoingEBillStatusCssClasses,
  OutgoingEBillStatusTitles,
} from "../OutgoingEBillsUIHelpers";
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

export function OutgoingEBillsFetchDialog({ show, onHide }) {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      ids: outgoingEBillsUIContext.ids,
    };
  }, [outgoingEBillsUIContext]);

  // OutgoingEBills Redux state
  const { outgoingEBills } = useSelector(
    (state) => ({
      outgoingEBills: selectedOutgoingEBills(
        state.outgoingEBills.entities,
        outgoingEBillsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if outgoingEBills weren't selected we should close modal
  useEffect(() => {
    if (!outgoingEBillsUIProps.ids || outgoingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoingEBillsUIProps.ids]);

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
