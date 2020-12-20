import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OutgoingEBillsUIHelpers";

const OutgoingEBillsUIContext = createContext();

export function useOutgoingEBillsUIContext() {
  return useContext(OutgoingEBillsUIContext);
}

export const OutgoingEBillsUIConsumer = OutgoingEBillsUIContext.Consumer;

export function OutgoingEBillsUIProvider({ outgoingEBillsUIEvents, children }) {
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

  const initOutgoingEBill = {
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
    initOutgoingEBill,
    newOutgoingEBillButtonClick: outgoingEBillsUIEvents.newOutgoingEBillButtonClick,
    openEditOutgoingEBillDialog: outgoingEBillsUIEvents.openEditOutgoingEBillDialog,
    openDeleteOutgoingEBillDialog: outgoingEBillsUIEvents.openDeleteOutgoingEBillDialog,
    openDeleteOutgoingEBillsDialog: outgoingEBillsUIEvents.openDeleteOutgoingEBillsDialog,
    openFetchOutgoingEBillsDialog: outgoingEBillsUIEvents.openFetchOutgoingEBillsDialog,
    openUpdateOutgoingEBillsStatusDialog: outgoingEBillsUIEvents.openUpdateOutgoingEBillsStatusDialog
  };

  return <OutgoingEBillsUIContext.Provider value={value}>{children}</OutgoingEBillsUIContext.Provider>;
}