import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ChequeStatusCssClasses,
  ChequeStatusTitles,
} from "../ChequesUIHelpers";
import * as actions from "../../../_redux/cheques/chequesActions";
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

export function ChequesUpdateStateDialog({ show, onHide }) {
  // Cheques UI Context
  const chequesUIContext = useChequesUIContext();
  const chequesUIProps = useMemo(() => {
    return {
      ids: chequesUIContext.ids,
      setIds: chequesUIContext.setIds,
      queryParams: chequesUIContext.queryParams,
    };
  }, [chequesUIContext]);

  // Cheques Redux state
  const { cheques, isLoading } = useSelector(
    (state) => ({
      cheques: selectedCheques(state.cheques.entities, chequesUIProps.ids),
      isLoading: state.cheques.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!chequesUIProps.ids || chequesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update cheques status by selected ids
    dispatch(actions.updateChequesStatus(chequesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCheques(chequesUIProps.queryParams)).then(() => {
          // clear selections list
          chequesUIProps.setIds([]);
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
          Status has been updated for selected cheques
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
