import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/outgoingEBills/outgoingEBillsActions";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";
import { useIntl } from "react-intl";
export function OutgoingEBillDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      setIds: outgoingEBillsUIContext.setIds,
      queryParams: outgoingEBillsUIContext.queryParams
    };
  }, [outgoingEBillsUIContext]);

  // OutgoingEBills Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.outgoingEBills.actionsLoading }),
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
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteOutgoingEBill = () => {
    // server request for deleting outgoingEBill by id
    dispatch(actions.deleteOutgoingEBill(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchOutgoingEBills(outgoingEBillsUIProps.queryParams));
      // clear selections list
      outgoingEBillsUIProps.setIds([]);
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

          {intl.formatMessage({ id: "MENU.OUTGOINGEBILLS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.OUTGOINGEBILLS.DELETE_MSG" })}</span>
        )}

        {isLoading && <span>{intl.formatMessage({ id: "MENU.OUTGOINGEBILLS.DELETING" })}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteOutgoingEBill}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
