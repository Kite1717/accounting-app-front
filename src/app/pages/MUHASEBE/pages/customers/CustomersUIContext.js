import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./CustomersUIHelpers";

const CustomersUIContext = createContext();

export function useCustomersUIContext() {
  return useContext(CustomersUIContext);
}

export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({customersUIEvents, children}) {
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

  const initCustomer = {
    id: undefined,
    fullName: "",
    shortName : "",
    phoneNumber : "",
    cityId: "1",
    townId :"1",
    email:"",
    tcTaxNo : "",
    address : "",
    customerStatus : "0",
    taxAdministration :"",
    customerLimit :"",
    customerLimitExchange  : "0",
    customerCategoryId: "1",
    customerSubCategoryId  : "1",
    openingPrice :"",
    openingDate :"",
    moneyStatus  :"0",
    maturityDate : "",
    customerRepresentativeId : "1",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCustomer,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    newCategoryButtonClick: customersUIEvents.newCategoryButtonClick,
    newSubCategoryButtonClick: customersUIEvents.newSubCategoryButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: customersUIEvents.openUpdateCustomersStatusDialog
  };

  return <CustomersUIContext.Provider value={value}>{children}</CustomersUIContext.Provider>;
}