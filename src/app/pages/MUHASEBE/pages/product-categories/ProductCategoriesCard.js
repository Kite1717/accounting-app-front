import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductCategoriesFilter } from "./product-categories-filter/ProductCategoriesFilter";
import { ProductCategoriesTable } from "./product-categories-table/ProductCategoriesTable";
import { ProductCategoriesGrouping } from "./product-categories-grouping/ProductCategoriesGrouping";
import { useProductCategoriesUIContext } from "./ProductCategoriesUIContext";

export function ProductCategoriesCard() {
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      ids: productCategoriesUIContext.ids,
      newProductCategoryButtonClick:
        productCategoriesUIContext.newProductCategoryButtonClick,
      newSuperCategoryButtonClick:
        productCategoriesUIContext.newSuperCategoryButtonClick,
      newSubCategoryButtonClick:
        productCategoriesUIContext.newSubCategoryButtonClick,
      newCategoryButtonClick: productCategoriesUIContext.newCategoryButtonClick,
    };
  }, [productCategoriesUIContext]);

  return (
    <Card>
      <CardHeader title="Ürün Kategorileri">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-warning mr-3"
            onClick={productCategoriesUIProps.newSuperCategoryButtonClick}
          >
            Üst Kategori Ekle
          </button>

          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={productCategoriesUIProps.newCategoryButtonClick}
          >
            Kategori Ekle
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={productCategoriesUIProps.newSubCategoryButtonClick}
          >
            Alt Kategori Ekle
          </button>
        </CardHeaderToolbar>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productCategoriesUIProps.newProductCategoryButtonClick}
          >
            Yeni Ürün Kategorisi
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductCategoriesFilter />
        {productCategoriesUIProps.ids.length > 0 && (
          <ProductCategoriesGrouping />
        )}
        <ProductCategoriesTable />
      </CardBody>
    </Card>
  );
}
