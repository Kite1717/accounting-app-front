import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/incomingEBills/incomingEBillsActions";
import { useIncomingEBillsUIContext } from "../IncomingEBillsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function IncomingEBillsDeleteDialog({ show, onHide }) {
  // IncomingEBills UI Context
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      ids: incomingEBillsUIContext.ids,
      setIds: incomingEBillsUIContext.setIds,
      queryParams: incomingEBillsUIContext.queryParams,
    };
  }, [incomingEBillsUIContext]);

  // IncomingEBills Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.incomingEBills.actionsLoading }),
    shallowEqual
  );

  // if incomingEBills weren't selected we should close modal
  useEffect(() => {
    if (!incomingEBillsUIProps.ids || incomingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingEBillsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteIncomingEBills = () => {
    // server request for deleting incomingEBill by selected ids
    dispatch(actions.deleteIncomingEBills(incomingEBillsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIncomingEBills(incomingEBillsUIProps.queryParams)).then(
        () => {
          // clear selections list
          incomingEBillsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          IncomingEBills Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected incomingEBills?</span>
        )}
        {isLoading && <span>IncomingEBill are deleting...</span>}
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
            onClick={deleteIncomingEBills}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
