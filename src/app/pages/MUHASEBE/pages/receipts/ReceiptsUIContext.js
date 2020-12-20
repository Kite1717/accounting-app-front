import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ReceiptsUIHelpers";

const ReceiptsUIContext = createContext();

export function useReceiptsUIContext() {
  return useContext(ReceiptsUIContext);
}

export const ReceiptsUIConsumer = ReceiptsUIContext.Consumer;

export function ReceiptsUIProvider({ receiptsUIEvents, children }) {
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

  const initReceipt = {
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
    initReceipt,
    newReceiptButtonClick: receiptsUIEvents.newReceiptButtonClick,
    openEditReceiptDialog: receiptsUIEvents.openEditReceiptDialog,
    openDeleteReceiptDialog: receiptsUIEvents.openDeleteReceiptDialog,
    openDeleteReceiptsDialog: receiptsUIEvents.openDeleteReceiptsDialog,
    openFetchReceiptsDialog: receiptsUIEvents.openFetchReceiptsDialog,
    openUpdateReceiptsStatusDialog:
      receiptsUIEvents.openUpdateReceiptsStatusDialog,
  };

  return (
    <ReceiptsUIContext.Provider value={value}>
      {children}
    </ReceiptsUIContext.Provider>
  );
}
