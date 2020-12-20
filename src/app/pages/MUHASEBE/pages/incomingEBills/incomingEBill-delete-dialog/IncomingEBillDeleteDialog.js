import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/incomingEBills/incomingEBillsActions";
import { useIncomingEBillsUIContext } from "../IncomingEBillsUIContext";
import { useIntl } from "react-intl";
export function IncomingEBillDeleteDialog({ id, show, onHide }) {

  const intl = useIntl();
  // IncomingEBills UI Context
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      setIds: incomingEBillsUIContext.setIds,
      queryParams: incomingEBillsUIContext.queryParams
    };
  }, [incomingEBillsUIContext]);

  // IncomingEBills Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.incomingEBills.actionsLoading }),
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

  const deleteIncomingEBill = () => {
    // server request for deleting incomingEBill by id
    dispatch(actions.deleteIncomingEBill(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIncomingEBills(incomingEBillsUIProps.queryParams));
      // clear selections list
      incomingEBillsUIProps.setIds([]);
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

          {intl.formatMessage({ id: "MENU.INCOMINGEBILLS.DEL" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MENU.INCOMINGEBILLS.DELETE_MSG" })}</span>
        )}

        {isLoading && <span>{intl.formatMessage({ id: "MENU.INCOMINGEBILLS.DELETING" })}</span>}
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
            onClick={deleteIncomingEBill}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({ id: "MENU.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
