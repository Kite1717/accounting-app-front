import React, { useMemo } from "react";
import { useProductCategoriesUIContext } from "../ProductCategoriesUIContext";

export function ProductCategoriesGrouping() {
  // ProductCategories UI Context
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      ids: productCategoriesUIContext.ids,
      setIds: productCategoriesUIContext.setIds,
      openDeleteProductCategoriesDialog:
        productCategoriesUIContext.openDeleteProductCategoriesDialog,
      openFetchProductCategoriesDialog:
        productCategoriesUIContext.openFetchProductCategoriesDialog,
      openUpdateProductCategoriesStatusDialog:
        productCategoriesUIContext.openUpdateProductCategoriesStatusDialog,
    };
  }, [productCategoriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{productCategoriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={
                  productCategoriesUIProps.openDeleteProductCategoriesDialog
                }
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  productCategoriesUIProps.openFetchProductCategoriesDialog
                }
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  productCategoriesUIProps.openUpdateProductCategoriesStatusDialog
                }
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
