import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./BanksUIHelpers";

const BanksUIContext = createContext();

export function useBanksUIContext() {
  return useContext(BanksUIContext);
}

export const BanksUIConsumer = BanksUIContext.Consumer;

export function BanksUIProvider({ banksUIEvents, children }) {
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

  const initBank = {
    id: undefined,
    bankCaseAccountName: "",
    currencyType : "₺",
    bankCode : "adabank",
    bankBrach : "",
    accountNumber : "",
    iban:"",
    ekstre:"0",
    openingDate:"",
    openingPrice:"",
    balanceStatus : "",

  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initBank,
    newBankButtonClick: banksUIEvents.newBankButtonClick,
    newCaseButtonClick: banksUIEvents.newCaseButtonClick,
    openEditBankDialog: banksUIEvents.openEditBankDialog,
    openDetailBankDialog : banksUIEvents.openDetailBankDialog,
    openDeleteBankDialog: banksUIEvents.openDeleteBankDialog,
    openDeleteBanksDialog: banksUIEvents.openDeleteBanksDialog,
    openFetchBanksDialog: banksUIEvents.openFetchBanksDialog,
    openUpdateBanksStatusDialog: banksUIEvents.openUpdateBanksStatusDialog,
  };

  return (
    <BanksUIContext.Provider value={value}>{children}</BanksUIContext.Provider>
  );
}
