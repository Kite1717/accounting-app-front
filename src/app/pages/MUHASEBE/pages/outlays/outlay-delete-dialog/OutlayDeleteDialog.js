import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/outlays/outlaysActions";
import { useOutlaysUIContext } from "../OutlaysUIContext";

export function OutlayDeleteDialog({ id, show, onHide }) {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      setIds: outlaysUIContext.setIds,
      queryParams: outlaysUIContext.queryParams,
    };
  }, [outlaysUIContext]);

  // Outlays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.outlays.actionsLoading }),
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

  const deleteOutlay = () => {
    // server request for deleting outlay by id
    dispatch(actions.deleteOutlay(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchOutlays(outlaysUIProps.queryParams));
      // clear selections list
      outlaysUIProps.setIds([]);
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
          Outlay Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this outlay?</span>
        )}
        {isLoading && <span>Outlay is deleting...</span>}
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
            onClick={deleteOutlay}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
