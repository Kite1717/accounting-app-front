import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/outlayDocuments/outlayDocumentsActions";
import { useOutlayDocumentsUIContext } from "../OutlayDocumentsUIContext";

export function OutlayDocumentDeleteDialog({ id, show, onHide }) {
  // OutlayDocuments UI Context
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      setIds: outlayDocumentsUIContext.setIds,
      queryParams: outlayDocumentsUIContext.queryParams,
    };
  }, [outlayDocumentsUIContext]);

  // OutlayDocuments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.outlayDocuments.actionsLoading }),
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
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteOutlayDocument = () => {
    // server request for deleting outlayDocument by id
    dispatch(actions.deleteOutlayDocument(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchOutlayDocuments(outlayDocumentsUIProps.queryParams)
      );
      // clear selections list
      outlayDocumentsUIProps.setIds([]);
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
          OutlayDocument Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this outlayDocument?</span>
        )}
        {isLoading && <span>OutlayDocument is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteOutlayDocument}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
