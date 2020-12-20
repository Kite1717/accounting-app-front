import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outgoingEBills/outgoingEBillsActions";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function OutgoingEBillsDeleteDialog({ show, onHide }) {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      ids: outgoingEBillsUIContext.ids,
      setIds: outgoingEBillsUIContext.setIds,
      queryParams: outgoingEBillsUIContext.queryParams,
    };
  }, [outgoingEBillsUIContext]);

  // OutgoingEBills Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.outgoingEBills.actionsLoading }),
    shallowEqual
  );

  // if outgoingEBills weren't selected we should close modal
  useEffect(() => {
    if (!outgoingEBillsUIProps.ids || outgoingEBillsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoingEBillsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteOutgoingEBills = () => {
    // server request for deleting outgoingEBill by selected ids
    dispatch(actions.deleteOutgoingEBills(outgoingEBillsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchOutgoingEBills(outgoingEBillsUIProps.queryParams)).then(
        () => {
          // clear selections list
          outgoingEBillsUIProps.setIds([]);
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
          OutgoingEBills Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected outgoingEBills?</span>
        )}
        {isLoading && <span>OutgoingEBill are deleting...</span>}
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
            onClick={deleteOutgoingEBills}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
