import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ChequesUIHelpers";

const ChequesUIContext = createContext();

export function useChequesUIContext() {
  return useContext(ChequesUIContext);
}

export const ChequesUIConsumer = ChequesUIContext.Consumer;

export function ChequesUIProvider({ chequesUIEvents, children }) {
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

  const initCheque = {
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
    initCheque,
    newChequeButtonClick: chequesUIEvents.newChequeButtonClick,
    openEditChequeDialog: chequesUIEvents.openEditChequeDialog,
    openDeleteChequeDialog: chequesUIEvents.openDeleteChequeDialog,
    openDeleteChequesDialog: chequesUIEvents.openDeleteChequesDialog,
    openFetchChequesDialog: chequesUIEvents.openFetchChequesDialog,
    openUpdateChequesStatusDialog:
      chequesUIEvents.openUpdateChequesStatusDialog,
  };

  return (
    <ChequesUIContext.Provider value={value}>
      {children}
    </ChequesUIContext.Provider>
  );
}
