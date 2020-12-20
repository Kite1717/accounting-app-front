import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  IncomingEBillStatusCssClasses,
  IncomingEBillStatusTitles,
} from "../IncomingEBillsUIHelpers";
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

export function IncomingEBillsFetchDialog({ show, onHide }) {
  // IncomingEBills UI Context
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      ids: incomingEBillsUIContext.ids,
    };
  }, [incomingEBillsUIContext]);

  // IncomingEBills Redux state
  const { incomingEBills } = useSelector(
    (state) => ({
      incomingEBills: selectedIncomingEBills(
        state.incomingEBills.entities,
        incomingEBillsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if incomingEBills weren't selected we should close modal
  useEffect(() => {
    if (!incomingEBillsUIProps.ids || incomingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingEBillsUIProps.ids]);

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
