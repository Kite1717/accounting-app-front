import * as requestFromServer from "./billsCrud";
import {billsSlice, callTypes} from "./billsSlice";

const {actions} = billsSlice;

export const fetchBills = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBills(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.billsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bills";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBill = id => dispatch => {
  if (!id) {
    return dispatch(actions.billFetched({ billForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBillById(id)
    .then(response => {
      const bill = response.data;
      dispatch(actions.billFetched({ billForEdit: bill }));
    })
    .catch(error => {
      error.clientMessage = "Can't find bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBill = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBill(id)
    .then(response => {
      dispatch(actions.billDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBill = billForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBill(billForCreation)
    .then(response => {
      const { bill } = response.data;
      dispatch(actions.billCreated({ bill }));
    })
    .catch(error => {
      error.clientMessage = "Can't create bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBill = bill => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBill(bill)
    .then(() => {
      dispatch(actions.billUpdated({ bill }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBillsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBills(ids, status)
    .then(() => {
      dispatch(actions.billsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update bills status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBills = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBills(ids)
    .then(() => {
      dispatch(actions.billsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete bills";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
