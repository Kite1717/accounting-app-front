import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cheques/chequesActions";
import { ChequeEditDialogHeader } from "./ChequeEditDialogHeader";
import { ChequeEditForm } from "./ChequeEditForm";
import { useChequesUIContext } from "../ChequesUIContext";

export function ChequeEditDialog({ id, show, onHide }) {
  // Cheques UI Context
  const chequesUIContext = useChequesUIContext();
  const chequesUIProps = useMemo(() => {
    return {
      initCheque: chequesUIContext.initCheque,
    };
  }, [chequesUIContext]);

  // Cheques Redux state
  const dispatch = useDispatch();
  const { actionsLoading, chequeForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.cheques.actionsLoading,
      chequeForEdit: state.cheques.chequeForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Cheque by id
    dispatch(actions.fetchCheque(id));
  }, [id, dispatch]);

  // server request for saving cheque
  const saveCheque = (cheque) => {
    if (!id) {
      // server request for creating cheque
      dispatch(actions.createCheque(cheque)).then(() => onHide());
    } else {
      // server request for updating cheque
      dispatch(actions.updateCheque(cheque)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ChequeEditDialogHeader id={id} />
      <ChequeEditForm
        saveCheque={saveCheque}
        actionsLoading={actionsLoading}
        cheque={chequeForEdit || chequesUIProps.initCheque}
        onHide={onHide}
      />
    </Modal>
  );
}
