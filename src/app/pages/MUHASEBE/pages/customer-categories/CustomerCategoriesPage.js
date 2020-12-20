import React from "react";
import { Route } from "react-router-dom";
import { CustomerCategoriesLoadingDialog } from "./customer-categories-loading-dialog/CustomerCategoriesLoadingDialog";
import { CustomerCategoryEditDialog } from "./customer-category-edit-dialog/CustomerCategoryEditDialog";
import { CustomerCategoryDeleteDialog } from "./customer-category-delete-dialog/CustomerCategoryDeleteDialog";
import { CustomerCategoriesDeleteDialog } from "./customer-categories-delete-dialog/CustomerCategoriesDeleteDialog";
import { CustomerCategoriesFetchDialog } from "./customer-categories-fetch-dialog/CustomerCategoriesFetchDialog";
import { CustomerCategoriesUpdateStateDialog } from "./customer-categories-update-status-dialog/CustomerCategoriesUpdateStateDialog";
import { CustomerCategoriesUIProvider } from "./CustomerCategoriesUIContext";
import { CustomerCategorySuperCategoryDialog } from "./customer-category-superCategory-dialog/CustomerCategorySuperCategoryDialog";
import { CustomerCategoryCategoryDialog } from "./customer-category-category-dialog/CustomerCategoryCategoryDialog";
import { CustomerCategoriesCard } from "./CustomerCategoriesCard";
import { CustomerCategorySubCategoryDialog } from "./customer-category-subCategory-dialog/CustomerCategorySubCategoryDialog";

export function CustomerCategoriesPage({ history }) {
  const customerCategoriesUIEvents = {
    newCustomerCategoryButtonClick: () => {
      history.push("/customer-categories/new");
    },
    openEditCustomerCategoryDialog: (id) => {
      history.push(`/customer-categories/${id}/edit`);
    },
    openDeleteCustomerCategoryDialog: (id) => {
      history.push(`/customer-categories/${id}/delete`);
    },
    openDeleteCustomerCategoriesDialog: () => {
      history.push(`/customer-categories/deleteCustomerCategories`);
    },
    openFetchCustomerCategoriesDialog: () => {
      history.push(`/customer-categories/fetch`);
    },
    openUpdateCustomerCategoriesStatusDialog: () => {
      history.push("/customer-categories/updateStatus");
    },
    newSuperCategoryButtonClick: () => {
      history.push("/customer-categories/super-category/new");
    },
    newCategoryButtonClick: () => {
      history.push("/customer-categories/category/new");
    },
    newSubCategoryButtonClick: () => {
      history.push("/customer-categories/sub-category/new");
    },
  };

  return (
    <CustomerCategoriesUIProvider
      customerCategoriesUIEvents={customerCategoriesUIEvents}
    >
      <CustomerCategoriesLoadingDialog />
      <Route path="/customer-categories/new">
        {({ history, match }) => (
          <CustomerCategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>
      <Route path="/customer-categories/:id/edit">
        {({ history, match }) => (
          <CustomerCategoryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>

      <Route path="/customer-categories/super-category/new">
        {({ history, match }) => (
          <CustomerCategorySuperCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>

      <Route path="/customer-categories/category/new">
        {({ history, match }) => (
          <CustomerCategoryCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>

      <Route path="/customer-categories/sub-category/new">
        {({ history, match }) => (
          <CustomerCategorySubCategoryDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>

      <Route path="/customer-categories/deleteCustomerCategories">
        {({ history, match }) => (
          <CustomerCategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>
      <Route path="/customer-categories/:id/delete">
        {({ history, match }) => (
          <CustomerCategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>
      <Route path="/customer-categories/fetch">
        {({ history, match }) => (
          <CustomerCategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>
      <Route path="/customer-categories/updateStatus">
        {({ history, match }) => (
          <CustomerCategoriesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/customer-categories");
            }}
          />
        )}
      </Route>
      <CustomerCategoriesCard />
    </CustomerCategoriesUIProvider>
  );
}
