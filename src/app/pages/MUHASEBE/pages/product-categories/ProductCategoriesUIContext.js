import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProductCategoriesUIHelpers";

const ProductCategoriesUIContext = createContext();

export function useProductCategoriesUIContext() {
  return useContext(ProductCategoriesUIContext);
}

export const ProductCategoriesUIConsumer = ProductCategoriesUIContext.Consumer;

export function ProductCategoriesUIProvider({
  productCategoriesUIEvents,
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

  const initProductCategory = {
    productCategoryName: "",
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
    initProductCategory,
    newProductCategoryButtonClick:
      productCategoriesUIEvents.newProductCategoryButtonClick,
    newSuperCategoryButtonClick:
      productCategoriesUIEvents.newSuperCategoryButtonClick,
    newCategoryButtonClick: productCategoriesUIEvents.newCategoryButtonClick,
    newSubCategoryButtonClick:
      productCategoriesUIEvents.newSubCategoryButtonClick,
    openEditProductCategoryDialog:
      productCategoriesUIEvents.openEditProductCategoryDialog,
    openDeleteProductCategoryDialog:
      productCategoriesUIEvents.openDeleteProductCategoryDialog,
    openDeleteProductCategoriesDialog:
      productCategoriesUIEvents.openDeleteProductCategoriesDialog,
    openFetchProductCategoriesDialog:
      productCategoriesUIEvents.openFetchProductCategoriesDialog,
    openUpdateProductCategoriesStatusDialog:
      productCategoriesUIEvents.openUpdateProductCategoriesStatusDialog,
  };

  return (
    <ProductCategoriesUIContext.Provider value={value}>
      {children}
    </ProductCategoriesUIContext.Provider>
  );
}
