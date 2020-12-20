import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./IncomingEBillsUIHelpers";

const IncomingEBillsUIContext = createContext();

export function useIncomingEBillsUIContext() {
  return useContext(IncomingEBillsUIContext);
}

export const IncomingEBillsUIConsumer = IncomingEBillsUIContext.Consumer;

export function IncomingEBillsUIProvider({ incomingEBillsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initIncomingEBill = {
    id: undefined,
    fullName: "",
    phoneNumber: "",
    email: "",
    tcNo: "",
    address: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initIncomingEBill,
    newIncomingEBillButtonClick: incomingEBillsUIEvents.newIncomingEBillButtonClick,
    openEditIncomingEBillDialog: incomingEBillsUIEvents.openEditIncomingEBillDialog,
    openDeleteIncomingEBillDialog: incomingEBillsUIEvents.openDeleteIncomingEBillDialog,
    openDeleteIncomingEBillsDialog: incomingEBillsUIEvents.openDeleteIncomingEBillsDialog,
    openFetchIncomingEBillsDialog: incomingEBillsUIEvents.openFetchIncomingEBillsDialog,
    openUpdateIncomingEBillsStatusDialog: incomingEBillsUIEvents.openUpdateIncomingEBillsStatusDialog
  };

  return <IncomingEBillsUIContext.Provider value={value}>{children}</IncomingEBillsUIContext.Provider>;
}