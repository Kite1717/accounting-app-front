import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./BillsUIHelpers";

const BillsUIContext = createContext();

export function useBillsUIContext() {
  return useContext(BillsUIContext);
}

export const BillsUIConsumer = BillsUIContext.Consumer;

export function BillsUIProvider({billsUIEvents, children}) {
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

  const initBill = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initBill,
    newBillButtonClick: billsUIEvents.newBillButtonClick,
    openEditBillDialog: billsUIEvents.openEditBillDialog,
    openDeleteBillDialog: billsUIEvents.openDeleteBillDialog,
    openDeleteBillsDialog: billsUIEvents.openDeleteBillsDialog,
    openFetchBillsDialog: billsUIEvents.openFetchBillsDialog,
    openUpdateBillsStatusDialog: billsUIEvents.openUpdateBillsStatusDialog
  };

  return <BillsUIContext.Provider value={value}>{children}</BillsUIContext.Provider>;
}