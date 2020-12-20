import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outgoingEBills/outgoingEBillsActions";
import { OutgoingEBillEditDialogHeader } from "./OutgoingEBillEditDialogHeader";
import { OutgoingEBillEditForm } from "./OutgoingEBillEditForm";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";

export function OutgoingEBillEditDialog({ id, show, onHide }) {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      initOutgoingEBill: outgoingEBillsUIContext.initOutgoingEBill,
    };
  }, [outgoingEBillsUIContext]);

  // OutgoingEBills Redux state
  const dispatch = useDispatch();
  const { actionsLoading, outgoingEBillForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.outgoingEBills.actionsLoading,
      outgoingEBillForEdit: state.outgoingEBills.outgoingEBillForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting OutgoingEBill by id
    dispatch(actions.fetchOutgoingEBill(id));
  }, [id, dispatch]);

  // server request for saving outgoingEBill
  const saveOutgoingEBill = (outgoingEBill) => {
    if (!id) {
      // server request for creating outgoingEBill
      dispatch(actions.createOutgoingEBill(outgoingEBill)).then(() => onHide());
    } else {
      // server request for updating outgoingEBill
      dispatch(actions.updateOutgoingEBill(outgoingEBill)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <OutgoingEBillEditDialogHeader id={id} />
      <OutgoingEBillEditForm
        saveOutgoingEBill={saveOutgoingEBill}
        actionsLoading={actionsLoading}
        outgoingEBill={outgoingEBillForEdit || outgoingEBillsUIProps.initOutgoingEBill}
        onHide={onHide}
      />
    </Modal>
  );
}
