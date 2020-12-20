import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/incomingEBills/incomingEBillsActions";
import { IncomingEBillEditDialogHeader } from "./IncomingEBillEditDialogHeader";
import { IncomingEBillEditForm } from "./IncomingEBillEditForm";
import { useIncomingEBillsUIContext } from "../IncomingEBillsUIContext";

export function IncomingEBillEditDialog({ id, show, onHide }) {
  // IncomingEBills UI Context
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      initIncomingEBill: incomingEBillsUIContext.initIncomingEBill,
    };
  }, [incomingEBillsUIContext]);

  // IncomingEBills Redux state
  const dispatch = useDispatch();
  const { actionsLoading, incomingEBillForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.incomingEBills.actionsLoading,
      incomingEBillForEdit: state.incomingEBills.incomingEBillForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting IncomingEBill by id
    dispatch(actions.fetchIncomingEBill(id));
  }, [id, dispatch]);

  // server request for saving incomingEBill
  const saveIncomingEBill = (incomingEBill) => {
    if (!id) {
      // server request for creating incomingEBill
      dispatch(actions.createIncomingEBill(incomingEBill)).then(() => onHide());
    } else {
      // server request for updating incomingEBill
      dispatch(actions.updateIncomingEBill(incomingEBill)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IncomingEBillEditDialogHeader id={id} />
      <IncomingEBillEditForm
        saveIncomingEBill={saveIncomingEBill}
        actionsLoading={actionsLoading}
        incomingEBill={incomingEBillForEdit || incomingEBillsUIProps.initIncomingEBill}
        onHide={onHide}
      />
    </Modal>
  );
}
