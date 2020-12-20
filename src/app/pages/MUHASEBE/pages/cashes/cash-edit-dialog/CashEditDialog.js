import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashes/cashesActions";
import { CashEditDialogHeader } from "./CashEditDialogHeader";
import { CashEditForm } from "./CashEditForm";
import { useCashesUIContext } from "../CashesUIContext";

export function CashEditDialog({ id, show, onHide }) {
  // Cashes UI Context
  const cashesUIContext = useCashesUIContext();
  const cashesUIProps = useMemo(() => {
    return {
      initCash: cashesUIContext.initCash,
    };
  }, [cashesUIContext]);

  // Cashes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, cashForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.cashes.actionsLoading,
      cashForEdit: state.cashes.cashForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Cash by id
    dispatch(actions.fetchCash(id));
  }, [id, dispatch]);

  // server request for saving cash
  const saveCash = (cash) => {
    if (!id) {
      // server request for creating cash
      dispatch(actions.createCash(cash)).then(() => onHide());
    } else {
      // server request for updating cash
      dispatch(actions.updateCash(cash)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CashEditDialogHeader id={id} />
      <CashEditForm
        saveCash={saveCash}
        actionsLoading={actionsLoading}
        cash={cashForEdit || cashesUIProps.initCash}
        onHide={onHide}
      />
    </Modal>
  );
}
