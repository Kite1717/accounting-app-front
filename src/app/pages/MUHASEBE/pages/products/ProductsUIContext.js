import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ProductsUIHelpers";

const ProductsUIContext = createContext();

export function useProductsUIContext() {
  return useContext(ProductsUIContext);
}

export const ProductsUIConsumer = ProductsUIContext.Consumer;

export function ProductsUIProvider({productsUIEvents, children}) {
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

  const initProduct = {
    productName : "",
    sellPrice : "",
    sellPriceExchange : "0",
    sellPriceKdv : "0",
    buyingPrice : "",
    buyingPriceExchange : "0",
    buyingPriceKdv : "0",
    taxCode : "0",
    unit : "Adet",
    stockTracking : "0",
    stockCode :"",
    openingAmount : "",
    openingDate : "",
    

    superProductCategoryId : "1",
    productCategoryId : "1",
    subProductCategoryId : "1",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initProduct,
    newProductButtonClick: productsUIEvents.newProductButtonClick,
    newSuperCategoryButtonClick : productsUIEvents.newSuperCategoryButtonClick,
    newCategoryButtonClick: productsUIEvents.newCategoryButtonClick,
    newSubCategoryButtonClick: productsUIEvents.newSubCategoryButtonClick,
    openEditProductDialog: productsUIEvents.openEditProductDialog,
    openDeleteProductDialog: productsUIEvents.openDeleteProductDialog,
    openDeleteProductsDialog: productsUIEvents.openDeleteProductsDialog,
    openFetchProductsDialog: productsUIEvents.openFetchProductsDialog,
    openUpdateProductsStatusDialog: productsUIEvents.openUpdateProductsStatusDialog
  };

  return <ProductsUIContext.Provider value={value}>{children}</ProductsUIContext.Provider>;
}