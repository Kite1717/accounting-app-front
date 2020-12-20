import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outlayDocuments/outlayDocumentsActions";
import { OutlayDocumentEditDialogHeader } from "./OutlayDocumentEditDialogHeader";
import { OutlayDocumentEditForm } from "./OutlayDocumentEditForm";
import { useOutlayDocumentsUIContext } from "../OutlayDocumentsUIContext";

export function OutlayDocumentEditDialog({ id, show, onHide }) {
  // OutlayDocuments UI Context
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      initOutlayDocument: outlayDocumentsUIContext.initOutlayDocument,
    };
  }, [outlayDocumentsUIContext]);

  // OutlayDocuments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, outlayDocumentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.outlayDocuments.actionsLoading,
      outlayDocumentForEdit: state.outlayDocuments.outlayDocumentForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting OutlayDocument by id
    dispatch(actions.fetchOutlayDocument(id));
  }, [id, dispatch]);

  // server request for saving outlayDocument
  const saveOutlayDocument = (outlayDocument) => {
    if (!id) {
      // server request for creating outlayDocument
      dispatch(actions.createOutlayDocument(outlayDocument)).then(() =>
        onHide()
      );
    } else {
      // server request for updating outlayDocument
      dispatch(actions.updateOutlayDocument(outlayDocument)).then(() =>
        onHide()
      );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <OutlayDocumentEditDialogHeader id={id} />
      <OutlayDocumentEditForm
        saveOutlayDocument={saveOutlayDocument}
        actionsLoading={actionsLoading}
        outlayDocument={
          outlayDocumentForEdit || outlayDocumentsUIProps.initOutlayDocument
        }
        onHide={onHide}
      />
    </Modal>
  );
}
