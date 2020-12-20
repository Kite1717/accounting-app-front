import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OutlaysUIHelpers";

const OutlaysUIContext = createContext();

export function useOutlaysUIContext() {
  return useContext(OutlaysUIContext);
}

export const OutlaysUIConsumer = OutlaysUIContext.Consumer;

export function OutlaysUIProvider({ outlaysUIEvents, children }) {
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

  const initOutlay = {
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
    initOutlay,
    newOutlayButtonClick: outlaysUIEvents.newOutlayButtonClick,
    openEditOutlayDialog: outlaysUIEvents.openEditOutlayDialog,
    openDeleteOutlayDialog: outlaysUIEvents.openDeleteOutlayDialog,
    openDeleteOutlaysDialog: outlaysUIEvents.openDeleteOutlaysDialog,
    openFetchOutlaysDialog: outlaysUIEvents.openFetchOutlaysDialog,
    openUpdateOutlaysStatusDialog:
      outlaysUIEvents.openUpdateOutlaysStatusDialog,
  };

  return (
    <OutlaysUIContext.Provider value={value}>
      {children}
    </OutlaysUIContext.Provider>
  );
}
