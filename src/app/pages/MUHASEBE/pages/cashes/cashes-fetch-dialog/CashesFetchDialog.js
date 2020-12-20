import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CashStatusCssClasses, CashStatusTitles } from "../CashesUIHelpers";
import { useCashesUIContext } from "../CashesUIContext";

const selectedCashes = (entities, ids) => {
  const _cashes = [];
  ids.forEach((id) => {
    const cash = entities.find((el) => el.id === id);
    if (cash) {
      _cashes.push(cash);
    }
  });
  return _cashes;
};

export function CashesFetchDialog({ show, onHide }) {
  // Cashes UI Context
  const cashesUIContext = useCashesUIContext();
  const cashesUIProps = useMemo(() => {
    return {
      ids: cashesUIContext.ids,
    };
  }, [cashesUIContext]);

  // Cashes Redux state
  const { cashes } = useSelector(
    (state) => ({
      cashes: selectedCashes(state.cashes.entities, cashesUIProps.ids),
    }),
    shallowEqual
  );

  // if cashes weren't selected we should close modal
  useEffect(() => {
    if (!cashesUIProps.ids || cashesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashesUIProps.ids]);

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
            {cashes.map((cash) => (
              <tr key={`id${cash.id}`}>
                <td>{cash.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      CashStatusCssClasses[cash.status]
                    } label-inline`}
                  >
                    {" "}
                    {CashStatusTitles[cash.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {cash.lastName}, {cash.firstName}
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
