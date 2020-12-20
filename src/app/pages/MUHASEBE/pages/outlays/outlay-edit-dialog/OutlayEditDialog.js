import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outlays/outlaysActions";
import { OutlayEditDialogHeader } from "./OutlayEditDialogHeader";
import { OutlayEditForm } from "./OutlayEditForm";
import { useOutlaysUIContext } from "../OutlaysUIContext";

export function OutlayEditDialog({ id, show, onHide }) {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      initOutlay: outlaysUIContext.initOutlay,
    };
  }, [outlaysUIContext]);

  // Outlays Redux state
  const dispatch = useDispatch();
  const { actionsLoading, outlayForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.outlays.actionsLoading,
      outlayForEdit: state.outlays.outlayForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Outlay by id
    dispatch(actions.fetchOutlay(id));
  }, [id, dispatch]);

  // server request for saving outlay
  const saveOutlay = (outlay) => {
    if (!id) {
      // server request for creating outlay
      dispatch(actions.createOutlay(outlay)).then(() => onHide());
    } else {
      // server request for updating outlay
      dispatch(actions.updateOutlay(outlay)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <OutlayEditDialogHeader id={id} />
      <OutlayEditForm
        saveOutlay={saveOutlay}
        actionsLoading={actionsLoading}
        outlay={outlayForEdit || outlaysUIProps.initOutlay}
        onHide={onHide}
      />
    </Modal>
  );
}
