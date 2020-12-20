import * as requestFromServer from "./cashesCrud";
import { cashesSlice, callTypes } from "./cashesSlice";

const { actions } = cashesSlice;

export const fetchCashes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCashes(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.cashesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCash = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.cashFetched({ cashForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCashById(id)
    .then((response) => {
      const cash = response.data;
      dispatch(actions.cashFetched({ cashForEdit: cash }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCash = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCash(id)
    .then((response) => {
      dispatch(actions.cashDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCash = (cashForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCash(cashForCreation)
    .then((response) => {
      const { cash } = response.data;
      dispatch(actions.cashCreated({ cash }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCash = (cash) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCash(cash)
    .then(() => {
      dispatch(actions.cashUpdated({ cash }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCashesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCashes(ids, status)
    .then(() => {
      dispatch(actions.cashesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cashes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCashes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashes(ids)
    .then(() => {
      dispatch(actions.cashesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
