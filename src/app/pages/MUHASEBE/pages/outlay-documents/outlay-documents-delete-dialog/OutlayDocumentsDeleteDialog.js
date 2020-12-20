import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outlayDocuments/outlayDocumentsActions";
import { useOutlayDocumentsUIContext } from "../OutlayDocumentsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function OutlayDocumentsDeleteDialog({ show, onHide }) {
  // OutlayDocuments UI Context
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      ids: outlayDocumentsUIContext.ids,
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

  // if outlayDocuments weren't selected we should close modal
  useEffect(() => {
    if (
      !outlayDocumentsUIProps.ids ||
      outlayDocumentsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlayDocumentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteOutlayDocuments = () => {
    // server request for deleting outlayDocument by selected ids
    dispatch(actions.deleteOutlayDocuments(outlayDocumentsUIProps.ids)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchOutlayDocuments(outlayDocumentsUIProps.queryParams)
        ).then(() => {
          // clear selections list
          outlayDocumentsUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
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
          OutlayDocuments Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected outlayDocuments?
          </span>
        )}
        {isLoading && <span>OutlayDocument are deleting...</span>}
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
            onClick={deleteOutlayDocuments}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
