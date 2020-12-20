import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/receiptsActions";
import { ReceiptEditDialogHeader } from "./ReceiptEditDialogHeader";
import { ReceiptEditForm } from "./ReceiptEditForm";
import { useReceiptsUIContext } from "../ReceiptsUIContext";

export function ReceiptEditDialog({ id, show, onHide }) {
  // Receipts UI Context
  const receiptsUIContext = useReceiptsUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      initReceipt: receiptsUIContext.initReceipt,
    };
  }, [receiptsUIContext]);

  // Receipts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, receiptForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.receipts.actionsLoading,
      receiptForEdit: state.receipts.receiptForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Receipt by id
    dispatch(actions.fetchReceipt(id));
  }, [id, dispatch]);

  // server request for saving receipt
  const saveReceipt = (receipt) => {
    if (!id) {
      // server request for creating receipt
      dispatch(actions.createReceipt(receipt)).then(() => onHide());
    } else {
      // server request for updating receipt
      dispatch(actions.updateReceipt(receipt)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ReceiptEditDialogHeader id={id} />
      <ReceiptEditForm
        saveReceipt={saveReceipt}
        actionsLoading={actionsLoading}
        receipt={receiptForEdit || receiptsUIProps.initReceipt}
        onHide={onHide}
      />
    </Modal>
  );
}
