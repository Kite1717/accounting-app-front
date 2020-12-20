import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/billsActions";
import { BillEditDialogHeader } from "./BillEditDialogHeader";
import { BillEditForm } from "./BillEditForm";
import { useBillsUIContext } from "../BillsUIContext";

export function BillEditDialog({ id, show, onHide }) {
  // Bills UI Context
  const billsUIContext = useBillsUIContext();
  const billsUIProps = useMemo(() => {
    return {
      initBill: billsUIContext.initBill,
    };
  }, [billsUIContext]);

  // Bills Redux state
  const dispatch = useDispatch();
  const { actionsLoading, billForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.bills.actionsLoading,
      billForEdit: state.bills.billForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Bill by id
    dispatch(actions.fetchBill(id));
  }, [id, dispatch]);

  // server request for saving bill
  const saveBill = (bill) => {
    if (!id) {
      // server request for creating bill
      dispatch(actions.createBill(bill)).then(() => onHide());
    } else {
      // server request for updating bill
      dispatch(actions.updateBill(bill)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <BillEditDialogHeader id={id} />
      <BillEditForm
        saveBill={saveBill}
        actionsLoading={actionsLoading}
        bill={billForEdit || billsUIProps.initBill}
        onHide={onHide}
      />
    </Modal>
  );
}
