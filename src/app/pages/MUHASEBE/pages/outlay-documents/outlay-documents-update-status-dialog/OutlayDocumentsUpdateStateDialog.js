import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  OutlayDocumentStatusCssClasses,
  OutlayDocumentStatusTitles,
} from "../OutlayDocumentsUIHelpers";
import * as actions from "../../../_redux/outlayDocuments/outlayDocumentsActions";
import { useOutlayDocumentsUIContext } from "../OutlayDocumentsUIContext";

const selectedOutlayDocuments = (entities, ids) => {
  const _outlayDocuments = [];
  ids.forEach((id) => {
    const outlayDocument = entities.find((el) => el.id === id);
    if (outlayDocument) {
      _outlayDocuments.push(outlayDocument);
    }
  });
  return _outlayDocuments;
};

export function OutlayDocumentsUpdateStateDialog({ show, onHide }) {
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
  const { outlayDocuments, isLoading } = useSelector(
    (state) => ({
      outlayDocuments: selectedOutlayDocuments(
        state.outlayDocuments.entities,
        outlayDocumentsUIProps.ids
      ),
      isLoading: state.outlayDocuments.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !outlayDocumentsUIProps.ids ||
      outlayDocumentsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlayDocumentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update outlayDocuments status by selected ids
    dispatch(
      actions.updateOutlayDocumentsStatus(outlayDocumentsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchOutlayDocuments(outlayDocumentsUIProps.queryParams)
      ).then(() => {
        // clear selections list
        outlayDocumentsUIProps.setIds([]);
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
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected outlayDocuments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>BILL</th>
            </tr>
          </thead>
          <tbody>
            {outlayDocuments.map((outlayDocument) => (
              <tr key={`id${outlayDocument.id}`}>
                <td>{outlayDocument.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      OutlayDocumentStatusCssClasses[outlayDocument.status]
                    } label-inline`}
                  >
                    {" "}
                    {OutlayDocumentStatusTitles[outlayDocument.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {outlayDocument.lastName}, {outlayDocument.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
