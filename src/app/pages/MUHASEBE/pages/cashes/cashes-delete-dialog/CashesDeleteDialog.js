import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashes/cashesActions";
import { useCashesUIContext } from "../CashesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CashesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashes.actionsLoading }),
    shallowEqual
  );

  // if cashes weren't selected we should close modal
  useEffect(() => {
    if (!cashesUIProps.ids || cashesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCashes = () => {
    // server request for deleting cash by selected ids
    dispatch(actions.deleteCashes(cashesUIProps.ids)).then(() => {
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cashes Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cashes?</span>
        )}
        {isLoading && <span>Cash are deleting...</span>}
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
            onClick={deleteCashes}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
