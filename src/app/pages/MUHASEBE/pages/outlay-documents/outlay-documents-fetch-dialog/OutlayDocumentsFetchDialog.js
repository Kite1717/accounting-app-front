import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  OutlayDocumentStatusCssClasses,
  OutlayDocumentStatusTitles,
} from "../OutlayDocumentsUIHelpers";
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

export function OutlayDocumentsFetchDialog({ show, onHide }) {
  // OutlayDocuments UI Context
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      ids: outlayDocumentsUIContext.ids,
    };
  }, [outlayDocumentsUIContext]);

  // OutlayDocuments Redux state
  const { outlayDocuments } = useSelector(
    (state) => ({
      outlayDocuments: selectedOutlayDocuments(
        state.outlayDocuments.entities,
        outlayDocumentsUIProps.ids
      ),
    }),
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
