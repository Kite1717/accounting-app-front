import * as requestFromServer from "./excahngesCrud";
import { exchangesSlice, callTypes } from "./exchangesSlice";
import Swal from 'sweetalert2'
const { actions } = exchangesSlice;

export const fetchExchanges = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findExchanges(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.exchangesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find exchanges";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchExchangesByTRY = () => dispatch => {
  
  return requestFromServer
    .getExchangesByTRY()
    .then(response => {
      const { exchange } = response.data;
      dispatch(actions.exchangeFetched({ exchangeForTRY: exchange }));
    })
    .catch(error => {
      error.clientMessage = "Can't find exchange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}

export const fetchExchange = id => dispatch => {
  if (!id) {
    return dispatch(actions.exchangeFetched({ exchangeForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExchangeById(id)
    .then(response => {
      const { exchange } = response.data;
      dispatch(actions.exchangeFetched({ exchangeForEdit: exchange }));
    })
    .catch(error => {
      error.clientMessage = "Can't find exchange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExchange = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExchange(id)
    .then(response => {
      dispatch(actions.exchangeDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete exchange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createExchange = exchangeForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createExchange(exchangeForCreation)
    .then(response => {
      const { exchange } = response.data;


      dispatch(actions.exchangeCreated({ exchange }));
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



      error.clientMessage = "Can't create exchange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExchange = exchange => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateExchange(exchange)
    .then(() => {
      dispatch(actions.exchangeUpdated({ exchange }));
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

      error.clientMessage = "Can't update exchange";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExchangesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForExchanges(ids, status)
    .then(() => {
      dispatch(actions.exchangesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update exchanges status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExchanges = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExchanges(ids)
    .then(() => {
      dispatch(actions.exchangesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete exchanges";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
