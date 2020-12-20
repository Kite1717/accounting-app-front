import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CustomerCategoriesUIHelpers";

const CustomerCategoriesUIContext = createContext();

export function useCustomerCategoriesUIContext() {
  return useContext(CustomerCategoriesUIContext);
}

export const CustomerCategoriesUIConsumer =
  CustomerCategoriesUIContext.Consumer;

export function CustomerCategoriesUIProvider({
  customerCategoriesUIEvents,
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

  const initCustomerCategory = {
    customerCategoryName: "",
    sellPrice: "",
    sellPriceExchange: "0",
    sellPriceKdv: "0",
    buyingPrice: "",
    buyingPriceExchange: "0",
    buyingPriceKdv: "0",
    taxCode: "0",
    unit: "Adet",
    stockTracking: "0",
    stockCode: "",
    openingAmount: "",
    openingDate: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCustomerCategory,
    newCustomerCategoryButtonClick:
      customerCategoriesUIEvents.newCustomerCategoryButtonClick,
    newSuperCategoryButtonClick:
      customerCategoriesUIEvents.newSuperCategoryButtonClick,
    newCategoryButtonClick: customerCategoriesUIEvents.newCategoryButtonClick,
    newSubCategoryButtonClick:
      customerCategoriesUIEvents.newSubCategoryButtonClick,
    openEditCustomerCategoryDialog:
      customerCategoriesUIEvents.openEditCustomerCategoryDialog,
    openDeleteCustomerCategoryDialog:
      customerCategoriesUIEvents.openDeleteCustomerCategoryDialog,
    openDeleteCustomerCategoriesDialog:
      customerCategoriesUIEvents.openDeleteCustomerCategoriesDialog,
    openFetchCustomerCategoriesDialog:
      customerCategoriesUIEvents.openFetchCustomerCategoriesDialog,
    openUpdateCustomerCategoriesStatusDialog:
      customerCategoriesUIEvents.openUpdateCustomerCategoriesStatusDialog,
  };

  return (
    <CustomerCategoriesUIContext.Provider value={value}>
      {children}
    </CustomerCategoriesUIContext.Provider>
  );
}
