import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductEditDialog } from "./product-edit-dialog/ProductEditDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
import { ProductsUpdateStateDialog } from "./products-update-status-dialog/ProductsUpdateStateDialog";
import { ProductsUIProvider } from "./ProductsUIContext";
import { ProductSuperCategoryDialog } from "./product-superCategory-dialog/ProductSuperCategoryDialog"
import { ProductCategoryDialog } from "./product-category-dialog/ProductCategoryDialog"
import { ProductsCard } from "./ProductsCard";
import { ProductSubCategoryDialog } from "./product-subCategory-dialog/ProductSubCategoryDialog";

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/products/new");
    },
    openEditProductDialog: (id) => {
      history.push(`/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/products/updateStatus");
    },
    newSuperCategoryButtonClick: () => {
      history.push("/products/super-category/new");
    },
    newCategoryButtonClick: () => {
      history.push("/products/category/new");
    },
    newSubCategoryButtonClick: () => {
      history.push("/products/sub-category/new");
    },
  }

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/products/new">
        {({ history, match }) => (
          <ProductEditDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>
      <Route path="/products/:id/edit">
        {({ history, match }) => (
          <ProductEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>

      <Route path="/products/super-category/new">
        {({ history, match }) => (
          <ProductSuperCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>

      <Route path="/products/category/new">
        {({ history, match }) => (
          <ProductCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>

      <Route path="/products/sub-category/new">
        {({ history, match }) => (
          <ProductSubCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>

      <Route path="/products/deleteProducts">
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>
      <Route path="/products/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>
      <Route path="/products/fetch">
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>
      <Route path="/products/updateStatus">
        {({ history, match }) => (
          <ProductsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/products");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}
