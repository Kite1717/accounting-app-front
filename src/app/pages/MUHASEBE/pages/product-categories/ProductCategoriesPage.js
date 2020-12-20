import React from "react";
import { Route } from "react-router-dom";
import { ProductCategoriesLoadingDialog } from "./product-categories-loading-dialog/ProductCategoriesLoadingDialog";
import { ProductCategoryEditDialog } from "./product-category-edit-dialog/ProductCategoryEditDialog";
import { ProductCategoryDeleteDialog } from "./product-category-delete-dialog/ProductCategoryDeleteDialog";
import { ProductCategoriesDeleteDialog } from "./product-categories-delete-dialog/ProductCategoriesDeleteDialog";
import { ProductCategoriesFetchDialog } from "./product-categories-fetch-dialog/ProductCategoriesFetchDialog";
import { ProductCategoriesUpdateStateDialog } from "./product-categories-update-status-dialog/ProductCategoriesUpdateStateDialog";
import { ProductCategoriesUIProvider } from "./ProductCategoriesUIContext";
import { ProductCategorySuperCategoryDialog } from "./product-category-superCategory-dialog/ProductCategorySuperCategoryDialog";
import { ProductCategoryCategoryDialog } from "./product-category-category-dialog/ProductCategoryCategoryDialog";
import { ProductCategoriesCard } from "./ProductCategoriesCard";
import { ProductCategorySubCategoryDialog } from "./product-category-subCategory-dialog/ProductCategorySubCategoryDialog";

export function ProductCategoriesPage({ history }) {
  const productCategoriesUIEvents = {
    newProductCategoryButtonClick: () => {
      history.push("/product-categories/new");
    },
    openEditProductCategoryDialog: (id) => {
      history.push(`/product-categories/${id}/edit`);
    },
    openDeleteProductCategoryDialog: (id) => {
      history.push(`/product-categories/${id}/delete`);
    },
    openDeleteProductCategoriesDialog: () => {
      history.push(`/product-categories/deleteProductCategories`);
    },
    openFetchProductCategoriesDialog: () => {
      history.push(`/product-categories/fetch`);
    },
    openUpdateProductCategoriesStatusDialog: () => {
      history.push("/product-categories/updateStatus");
    },
    newSuperCategoryButtonClick: () => {
      history.push("/product-categories/super-category/new");
    },
    newCategoryButtonClick: () => {
      history.push("/product-categories/category/new");
    },
    newSubCategoryButtonClick: () => {
      history.push("/product-categories/sub-category/new");
    },
  };

  return (
    <ProductCategoriesUIProvider
      productCategoriesUIEvents={productCategoriesUIEvents}
    >
      <ProductCategoriesLoadingDialog />
      <Route path="/product-categories/new">
        {({ history, match }) => (
          <ProductCategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>
      <Route path="/product-categories/:id/edit">
        {({ history, match }) => (
          <ProductCategoryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>

      <Route path="/product-categories/super-category/new">
        {({ history, match }) => (
          <ProductCategorySuperCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>

      <Route path="/product-categories/category/new">
        {({ history, match }) => (
          <ProductCategoryCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>

      <Route path="/product-categories/sub-category/new">
        {({ history, match }) => (
          <ProductCategorySubCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>

      <Route path="/product-categories/deleteProductCategories">
        {({ history, match }) => (
          <ProductCategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>
      <Route path="/product-categories/:id/delete">
        {({ history, match }) => (
          <ProductCategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>
      <Route path="/product-categories/fetch">
        {({ history, match }) => (
          <ProductCategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>
      <Route path="/product-categories/updateStatus">
        {({ history, match }) => (
          <ProductCategoriesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/product-categories");
            }}
          />
        )}
      </Route>
      <ProductCategoriesCard />
    </ProductCategoriesUIProvider>
  );
}
