import React from "react";
import { Route } from "react-router-dom";
import { ReceiptsLoadingDialog } from "./receipts-loading-dialog/ReceiptsLoadingDialog";
import { ReceiptEditDialog } from "./receipt-edit-dialog/ReceiptEditDialog";
import { ReceiptDeleteDialog } from "./receipt-delete-dialog/ReceiptDeleteDialog";
import { ReceiptsDeleteDialog } from "./receipts-delete-dialog/ReceiptsDeleteDialog";
import { ReceiptsFetchDialog } from "./receipts-fetch-dialog/ReceiptsFetchDialog";
import { ReceiptsUpdateStateDialog } from "./receipts-update-status-dialog/ReceiptsUpdateStateDialog";
import { ReceiptsUIProvider } from "./ReceiptsUIContext";
import { ReceiptsCard } from "./ReceiptsCard";

export function ReceiptsPage({ history }) {
  const receiptsUIEvents = {
    newReceiptButtonClick: () => {
      history.push("/receipts/new");
    },
    openEditReceiptDialog: (id) => {
      history.push(`/receipts/${id}/edit`);
    },
    openDeleteReceiptDialog: (id) => {
      history.push(`/receipts/${id}/delete`);
    },
    openDeleteReceiptsDialog: () => {
      history.push(`/receipts/deleteReceipts`);
    },
    openFetchReceiptsDialog: () => {
      history.push(`/receipts/fetch`);
    },
    openUpdateReceiptsStatusDialog: () => {
      history.push("/receipts/updateStatus");
    },
  };

  return (
    <ReceiptsUIProvider receiptsUIEvents={receiptsUIEvents}>
      <ReceiptsLoadingDialog />
      <Route path="/receipts/new">
        {({ history, match }) => (
          <ReceiptEditDialog
            show={match != null}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/receipts/:id/edit">
        {({ history, match }) => (
          <ReceiptEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/receipts/deleteReceipts">
        {({ history, match }) => (
          <ReceiptsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/receipts/:id/delete">
        {({ history, match }) => (
          <ReceiptDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/receipts/fetch">
        {({ history, match }) => (
          <ReceiptsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <Route path="/receipts/updateStatus">
        {({ history, match }) => (
          <ReceiptsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/receipts");
            }}
          />
        )}
      </Route>
      <ReceiptsCard />
    </ReceiptsUIProvider>
  );
}
