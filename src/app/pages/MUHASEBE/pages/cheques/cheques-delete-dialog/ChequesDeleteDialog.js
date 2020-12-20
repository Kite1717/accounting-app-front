import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cheques/chequesActions";
import { useChequesUIContext } from "../ChequesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ChequesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cheques.actionsLoading }),
    shallowEqual
  );

  // if cheques weren't selected we should close modal
  useEffect(() => {
    if (!chequesUIProps.ids || chequesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCheques = () => {
    // server request for deleting cheque by selected ids
    dispatch(actions.deleteCheques(chequesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCheques(chequesUIProps.queryParams)).then(() => {
        // clear selections list
        chequesUIProps.setIds([]);
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cheques Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cheques?</span>
        )}
        {isLoading && <span>Cheque are deleting...</span>}
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
            onClick={deleteCheques}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
