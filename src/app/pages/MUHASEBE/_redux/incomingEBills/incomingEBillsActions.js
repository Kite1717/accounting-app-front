import * as requestFromServer from "./incomingEBillsCrud";
import { incomingEBillsSlice, callTypes } from "./incomingEBillsSlice";
import Swal from 'sweetalert2'
const { actions } = incomingEBillsSlice;

export const fetchIncomingEBills = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIncomingEBills(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.incomingEBillsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find incomingEBills";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIncomingEBill = id => dispatch => {
  if (!id) {
    return dispatch(actions.incomingEBillFetched({ incomingEBillForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIncomingEBillById(id)
    .then(response => {
      const { incomingEBill } = response.data;
      dispatch(actions.incomingEBillFetched({ incomingEBillForEdit: incomingEBill }));
    })
    .catch(error => {
      error.clientMessage = "Can't find incomingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIncomingEBill = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIncomingEBill(id)
    .then(response => {
      dispatch(actions.incomingEBillDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete incomingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createIncomingEBill = incomingEBillForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIncomingEBill(incomingEBillForCreation)
    .then(response => {
      const { incomingEBill } = response.data;


      dispatch(actions.incomingEBillCreated({ incomingEBill }));
    })
    .catch(error => {


      const data = error.response.data
      if (data.errors[0].message === "tcNo must be unique") {
        Swal.fire({

          icon: 'error',
          title: 'Bu TC Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        })
      }
      else if (data.errors[0].message === "deviceIdNo must be unique") {
        Swal.fire({

          icon: 'error',
          title: 'Bu Cihaz Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        })
      }



      error.clientMessage = "Can't create incomingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIncomingEBill = incomingEBill => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIncomingEBill(incomingEBill)
    .then(() => {
      dispatch(actions.incomingEBillUpdated({ incomingEBill }));
    })
    .catch(error => {
      if (!error.response.data.type) {
        Swal.fire({

          icon: 'error',
          title: 'Girdiğiniz TC numarası veya cihaz kimlik numarası başka bir kullancıya aittir',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'

        })

      }

      error.clientMessage = "Can't update incomingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIncomingEBillsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIncomingEBills(ids, status)
    .then(() => {
      dispatch(actions.incomingEBillsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update incomingEBills status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIncomingEBills = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIncomingEBills(ids)
    .then(() => {
      dispatch(actions.incomingEBillsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete incomingEBills";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
