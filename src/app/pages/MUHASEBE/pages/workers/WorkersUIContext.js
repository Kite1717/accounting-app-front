import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./WorkersUIHelpers";

const WorkersUIContext = createContext();

export function useWorkersUIContext() {
  return useContext(WorkersUIContext);
}

export const WorkersUIConsumer = WorkersUIContext.Consumer;

export function WorkersUIProvider({ workersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initWorker = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initWorker,
    newWorkerButtonClick: workersUIEvents.newWorkerButtonClick,
    openEditWorkerDialog: workersUIEvents.openEditWorkerDialog,
    openDeleteWorkerDialog: workersUIEvents.openDeleteWorkerDialog,
    openDeleteWorkersDialog: workersUIEvents.openDeleteWorkersDialog,
    openFetchWorkersDialog: workersUIEvents.openFetchWorkersDialog,
    openUpdateWorkersStatusDialog:
      workersUIEvents.openUpdateWorkersStatusDialog,
  };

  return (
    <WorkersUIContext.Provider value={value}>
      {children}
    </WorkersUIContext.Provider>
  );
}
