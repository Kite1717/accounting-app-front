import * as requestFromServer from "./outgoingEBillsCrud";
import { outgoingEBillsSlice, callTypes } from "./outgoingEBillsSlice";
import Swal from 'sweetalert2'
const { actions } = outgoingEBillsSlice;

export const fetchOutgoingEBills = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOutgoingEBills(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.outgoingEBillsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find outgoingEBills";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchOutgoingEBill = id => dispatch => {
  if (!id) {
    return dispatch(actions.outgoingEBillFetched({ outgoingEBillForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOutgoingEBillById(id)
    .then(response => {
      const { outgoingEBill } = response.data;
      dispatch(actions.outgoingEBillFetched({ outgoingEBillForEdit: outgoingEBill }));
    })
    .catch(error => {
      error.clientMessage = "Can't find outgoingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutgoingEBill = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutgoingEBill(id)
    .then(response => {
      dispatch(actions.outgoingEBillDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete outgoingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createOutgoingEBill = outgoingEBillForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createOutgoingEBill(outgoingEBillForCreation)
    .then(response => {
      const { outgoingEBill } = response.data;


      dispatch(actions.outgoingEBillCreated({ outgoingEBill }));
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



      error.clientMessage = "Can't create outgoingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutgoingEBill = outgoingEBill => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOutgoingEBill(outgoingEBill)
    .then(() => {
      dispatch(actions.outgoingEBillUpdated({ outgoingEBill }));
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

      error.clientMessage = "Can't update outgoingEBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOutgoingEBillsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForOutgoingEBills(ids, status)
    .then(() => {
      dispatch(actions.outgoingEBillsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update outgoingEBills status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOutgoingEBills = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOutgoingEBills(ids)
    .then(() => {
      dispatch(actions.outgoingEBillsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete outgoingEBills";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
