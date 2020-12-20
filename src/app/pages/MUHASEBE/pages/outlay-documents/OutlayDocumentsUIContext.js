import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OutlayDocumentsUIHelpers";

const OutlayDocumentsUIContext = createContext();

export function useOutlayDocumentsUIContext() {
  return useContext(OutlayDocumentsUIContext);
}

export const OutlayDocumentsUIConsumer = OutlayDocumentsUIContext.Consumer;

export function OutlayDocumentsUIProvider({
  outlayDocumentsUIEvents,
  children,
}) {
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

  const initOutlayDocument = {
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
    initOutlayDocument,
    newOutlayDocumentButtonClick:
      outlayDocumentsUIEvents.newOutlayDocumentButtonClick,
    openEditOutlayDocumentDialog:
      outlayDocumentsUIEvents.openEditOutlayDocumentDialog,
    openDeleteOutlayDocumentDialog:
      outlayDocumentsUIEvents.openDeleteOutlayDocumentDialog,
    openDeleteOutlayDocumentsDialog:
      outlayDocumentsUIEvents.openDeleteOutlayDocumentsDialog,
    openFetchOutlayDocumentsDialog:
      outlayDocumentsUIEvents.openFetchOutlayDocumentsDialog,
    openUpdateOutlayDocumentsStatusDialog:
      outlayDocumentsUIEvents.openUpdateOutlayDocumentsStatusDialog,
  };

  return (
    <OutlayDocumentsUIContext.Provider value={value}>
      {children}
    </OutlayDocumentsUIContext.Provider>
  );
}
