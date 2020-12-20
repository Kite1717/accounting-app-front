import * as requestFromServer from "./workersCrud";
import { workersSlice, callTypes } from "./workersSlice";

const { actions } = workersSlice;

export const fetchWorkers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findWorkers(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.workersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find workers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchWorker = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.workerFetched({ workerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getWorkerById(id)
    .then((response) => {
      const worker = response.data;
      dispatch(actions.workerFetched({ workerForEdit: worker }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find worker";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteWorker = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWorker(id)
    .then((response) => {
      dispatch(actions.workerDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete worker";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createWorker = (workerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createWorker(workerForCreation)
    .then((response) => {
      const { worker } = response.data;
      dispatch(actions.workerCreated({ worker }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create worker";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateWorker = (worker) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateWorker(worker)
    .then(() => {
      dispatch(actions.workerUpdated({ worker }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update worker";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateWorkersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForWorkers(ids, status)
    .then(() => {
      dispatch(actions.workersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update workers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteWorkers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWorkers(ids)
    .then(() => {
      dispatch(actions.workersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete workers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
