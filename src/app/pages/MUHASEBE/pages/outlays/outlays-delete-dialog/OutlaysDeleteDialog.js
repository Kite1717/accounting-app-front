import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outlays/outlaysActions";
import { useOutlaysUIContext } from "../OutlaysUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function OutlaysDeleteDialog({ show, onHide }) {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      ids: outlaysUIContext.ids,
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

  // if outlays weren't selected we should close modal
  useEffect(() => {
    if (!outlaysUIProps.ids || outlaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlaysUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteOutlays = () => {
    // server request for deleting outlay by selected ids
    dispatch(actions.deleteOutlays(outlaysUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchOutlays(outlaysUIProps.queryParams)).then(() => {
        // clear selections list
        outlaysUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
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
          Outlays Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected outlays?</span>
        )}
        {isLoading && <span>Outlay are deleting...</span>}
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
            onClick={deleteOutlays}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
