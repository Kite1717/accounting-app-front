import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ChequeStatusCssClasses,
  ChequeStatusTitles,
} from "../ChequesUIHelpers";
import { useChequesUIContext } from "../ChequesUIContext";

const selectedCheques = (entities, ids) => {
  const _cheques = [];
  ids.forEach((id) => {
    const cheque = entities.find((el) => el.id === id);
    if (cheque) {
      _cheques.push(cheque);
    }
  });
  return _cheques;
};

export function ChequesFetchDialog({ show, onHide }) {
  // Cheques UI Context
  const chequesUIContext = useChequesUIContext();
  const chequesUIProps = useMemo(() => {
    return {
      ids: chequesUIContext.ids,
    };
  }, [chequesUIContext]);

  // Cheques Redux state
  const { cheques } = useSelector(
    (state) => ({
      cheques: selectedCheques(state.cheques.entities, chequesUIProps.ids),
    }),
    shallowEqual
  );

  // if cheques weren't selected we should close modal
  useEffect(() => {
    if (!chequesUIProps.ids || chequesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequesUIProps.ids]);

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
            {cheques.map((cheque) => (
              <tr key={`id${cheque.id}`}>
                <td>{cheque.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ChequeStatusCssClasses[cheque.status]
                    } label-inline`}
                  >
                    {" "}
                    {ChequeStatusTitles[cheque.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {cheque.lastName}, {cheque.firstName}
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
