import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CashesUIHelpers";

const CashesUIContext = createContext();

export function useCashesUIContext() {
  return useContext(CashesUIContext);
}

export const CashesUIConsumer = CashesUIContext.Consumer;

export function CashesUIProvider({ cashesUIEvents, children }) {
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

  const initCash = {
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
    initCash,
    newCashButtonClick: cashesUIEvents.newCashButtonClick,
    openEditCashDialog: cashesUIEvents.openEditCashDialog,
    openDeleteCashDialog: cashesUIEvents.openDeleteCashDialog,
    openDeleteCashesDialog: cashesUIEvents.openDeleteCashesDialog,
    openFetchCashesDialog: cashesUIEvents.openFetchCashesDialog,
    openUpdateCashesStatusDialog: cashesUIEvents.openUpdateCashesStatusDialog,
  };

  return (
    <CashesUIContext.Provider value={value}>
      {children}
    </CashesUIContext.Provider>
  );
}
