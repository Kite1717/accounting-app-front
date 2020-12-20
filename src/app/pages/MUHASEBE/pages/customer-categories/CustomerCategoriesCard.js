import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CustomerCategoriesFilter } from "./customer-categories-filter/CustomerCategoriesFilter";
import { CustomerCategoriesTable } from "./customer-categories-table/CustomerCategoriesTable";
import { CustomerCategoriesGrouping } from "./customer-categories-grouping/CustomerCategoriesGrouping";
import { useCustomerCategoriesUIContext } from "./CustomerCategoriesUIContext";

export function CustomerCategoriesCard() {
  const customerCategoriesUIContext = useCustomerCategoriesUIContext();
  const customerCategoriesUIProps = useMemo(() => {
    return {
      ids: customerCategoriesUIContext.ids,
      newCustomerCategoryButtonClick:
        customerCategoriesUIContext.newCustomerCategoryButtonClick,
      newSuperCategoryButtonClick:
        customerCategoriesUIContext.newSuperCategoryButtonClick,
      newSubCategoryButtonClick:
        customerCategoriesUIContext.newSubCategoryButtonClick,
      newCategoryButtonClick:
        customerCategoriesUIContext.newCategoryButtonClick,
    };
  }, [customerCategoriesUIContext]);

  return (
    <Card>
      <CardHeader title="Müşteri Kategorileri">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={customerCategoriesUIProps.newCategoryButtonClick}
          >
            Kategori Ekle
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={customerCategoriesUIProps.newSubCategoryButtonClick}
          >
            Alt Kategori Ekle
          </button>
        </CardHeaderToolbar>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={customerCategoriesUIProps.newCustomerCategoryButtonClick}
          >
            Yeni Müşteri Kategorisi
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CustomerCategoriesFilter />
        {customerCategoriesUIProps.ids.length > 0 && (
          <CustomerCategoriesGrouping />
        )}
        <CustomerCategoriesTable />
      </CardBody>
    </Card>
  );
}
