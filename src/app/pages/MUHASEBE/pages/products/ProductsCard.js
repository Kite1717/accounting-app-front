import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductsFilter } from "./products-filter/ProductsFilter";
import { ProductsTable } from "./products-table/ProductsTable";
import { ProductsGrouping } from "./products-grouping/ProductsGrouping";
import { useProductsUIContext } from "./ProductsUIContext";

export function ProductsCard() {
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      newProductButtonClick: productsUIContext.newProductButtonClick,
      newSuperCategoryButtonClick : productsUIContext.newSuperCategoryButtonClick,
      newSubCategoryButtonClick: productsUIContext.newSubCategoryButtonClick,
      newCategoryButtonClick: productsUIContext.newCategoryButtonClick,
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title="Ürün Listesi">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-warning mr-3"
            onClick={productsUIProps.newSuperCategoryButtonClick}
          >
            Üst Kategori Ekle
            </button>

          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={productsUIProps.newCategoryButtonClick}
          >
            Kategori Ekle
            </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={productsUIProps.newSubCategoryButtonClick}
          >
            Alt Kategori Ekle
            </button>
        </CardHeaderToolbar>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newProductButtonClick}
          >
            Yeni Ürün
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductsFilter />
        {productsUIProps.ids.length > 0 && <ProductsGrouping />}
        <ProductsTable />
      </CardBody>
    </Card>
  );
}
