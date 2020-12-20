import * as requestFromServer from "./outlayDocumentsCrud";
import { outlayDocumentsSlice, callTypes } from "./outlayDocumentsSlice";

const { actions } = outlayDocumentsSlice;

export const fetchOutlayDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOutlayDocuments(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.outlayDocumentsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find outlayDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchOutlayDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.outlayDocumentFetched({ outlayDocumentForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOutlayDocumentById(id)
    .then((response) => {
      const outlayDocument = response.data;
      dispatch(
        actions.outlayDocumentFetched({ outlayDocumentForEdit: outlayDocument })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find outlayDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutlayDocument = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutlayDocument(id)
    .then((response) => {
      dispatch(actions.outlayDocumentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete outlayDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createOutlayDocument = (outlayDocumentForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createOutlayDocument(outlayDocumentForCreation)
    .then((response) => {
      const { outlayDocument } = response.data;
      dispatch(actions.outlayDocumentCreated({ outlayDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create outlayDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutlayDocument = (outlayDocument) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOutlayDocument(outlayDocument)
    .then(() => {
      dispatch(actions.outlayDocumentUpdated({ outlayDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update outlayDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutlayDocumentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForOutlayDocuments(ids, status)
    .then(() => {
      dispatch(actions.outlayDocumentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update outlayDocuments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutlayDocuments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutlayDocuments(ids)
    .then(() => {
      dispatch(actions.outlayDocumentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete outlayDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
