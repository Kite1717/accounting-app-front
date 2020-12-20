import * as requestFromServer from "./outlaysCrud";
import { outlaysSlice, callTypes } from "./outlaysSlice";

const { actions } = outlaysSlice;

export const fetchOutlays = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOutlays(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.outlaysFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find outlays";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchOutlay = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.outlayFetched({ outlayForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOutlayById(id)
    .then((response) => {
      const outlay = response.data;
      dispatch(actions.outlayFetched({ outlayForEdit: outlay }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find outlay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutlay = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutlay(id)
    .then((response) => {
      dispatch(actions.outlayDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete outlay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createOutlay = (outlayForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createOutlay(outlayForCreation)
    .then((response) => {
      const { outlay } = response.data;
      dispatch(actions.outlayCreated({ outlay }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create outlay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutlay = (outlay) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOutlay(outlay)
    .then(() => {
      dispatch(actions.outlayUpdated({ outlay }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update outlay";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutlaysStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForOutlays(ids, status)
    .then(() => {
      dispatch(actions.outlaysStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update outlays status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutlays = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutlays(ids)
    .then(() => {
      dispatch(actions.outlaysDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete outlays";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
