import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CashStatusCssClasses, CashStatusTitles } from "../CashesUIHelpers";
import * as actions from "../../../_redux/cashes/cashesActions";
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

export function CashesUpdateStateDialog({ show, onHide }) {
  // Cashes UI Context
  const cashesUIContext = useCashesUIContext();
  const cashesUIProps = useMemo(() => {
    return {
      ids: cashesUIContext.ids,
      setIds: cashesUIContext.setIds,
      queryParams: cashesUIContext.queryParams,
    };
  }, [cashesUIContext]);

  // Cashes Redux state
  const { cashes, isLoading } = useSelector(
    (state) => ({
      cashes: selectedCashes(state.cashes.entities, cashesUIProps.ids),
      isLoading: state.cashes.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!cashesUIProps.ids || cashesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update cashes status by selected ids
    dispatch(actions.updateCashesStatus(cashesUIProps.ids, status)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashes(cashesUIProps.queryParams)).then(() => {
        // clear selections list
        cashesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected cashes
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
