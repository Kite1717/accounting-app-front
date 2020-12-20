import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/cheques/chequesActions";
import { useChequesUIContext } from "../ChequesUIContext";

export function ChequeDeleteDialog({ id, show, onHide }) {
  // Cheques UI Context
  const chequesUIContext = useChequesUIContext();
  const chequesUIProps = useMemo(() => {
    return {
      setIds: chequesUIContext.setIds,
      queryParams: chequesUIContext.queryParams,
    };
  }, [chequesUIContext]);

  // Cheques Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cheques.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCheque = () => {
    // server request for deleting cheque by id
    dispatch(actions.deleteCheque(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCheques(chequesUIProps.queryParams));
      // clear selections list
      chequesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cheque Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this cheque?</span>
        )}
        {isLoading && <span>Cheque is deleting...</span>}
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
            onClick={deleteCheque}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
