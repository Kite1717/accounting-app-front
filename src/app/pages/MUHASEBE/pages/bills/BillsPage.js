import React from "react";
import { Route } from "react-router-dom";
import { BillsLoadingDialog } from "./bills-loading-dialog/BillsLoadingDialog";
import { BillEditDialog } from "./bill-edit-dialog/BillEditDialog";
import { BillDeleteDialog } from "./bill-delete-dialog/BillDeleteDialog";
import { BillsDeleteDialog } from "./bills-delete-dialog/BillsDeleteDialog";
import { BillsFetchDialog } from "./bills-fetch-dialog/BillsFetchDialog";
import { BillsUpdateStateDialog } from "./bills-update-status-dialog/BillsUpdateStateDialog";
import { BillsUIProvider } from "./BillsUIContext";
import { BillsCard } from "./BillsCard";

export function BillsPage({ history }) {
  const billsUIEvents = {
    newBillButtonClick: () => {
      history.push("/bills/new");
    },
    openEditBillDialog: (id) => {
      history.push(`/bills/${id}/edit`);
    },
    openDeleteBillDialog: (id) => {
      history.push(`/bills/${id}/delete`);
    },
    openDeleteBillsDialog: () => {
      history.push(`/bills/deleteBills`);
    },
    openFetchBillsDialog: () => {
      history.push(`/bills/fetch`);
    },
    openUpdateBillsStatusDialog: () => {
      history.push("/bills/updateStatus");
    }
  }

  return (
    <BillsUIProvider billsUIEvents={billsUIEvents}>
      <BillsLoadingDialog />
      <Route path="/bills/new">
        {({ history, match }) => (
          <BillEditDialog
            show={match != null}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <Route path="/bills/:id/edit">
        {({ history, match }) => (
          <BillEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <Route path="/bills/deleteBills">
        {({ history, match }) => (
          <BillsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <Route path="/bills/:id/delete">
        {({ history, match }) => (
          <BillDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <Route path="/bills/fetch">
        {({ history, match }) => (
          <BillsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <Route path="/bills/updateStatus">
        {({ history, match }) => (
          <BillsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/bills");
            }}
          />
        )}
      </Route>
      <BillsCard />
    </BillsUIProvider>
  );
}
