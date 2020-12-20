import React from "react";
import { Route } from "react-router-dom";
import { ChequesLoadingDialog } from "./cheques-loading-dialog/ChequesLoadingDialog";
import { ChequeEditDialog } from "./cheque-edit-dialog/ChequeEditDialog";
import { ChequeDeleteDialog } from "./cheque-delete-dialog/ChequeDeleteDialog";
import { ChequesDeleteDialog } from "./cheques-delete-dialog/ChequesDeleteDialog";
import { ChequesFetchDialog } from "./cheques-fetch-dialog/ChequesFetchDialog";
import { ChequesUpdateStateDialog } from "./cheques-update-status-dialog/ChequesUpdateStateDialog";
import { ChequesUIProvider } from "./ChequesUIContext";
import { ChequesCard } from "./ChequesCard";

export function ChequesPage({ history }) {
  const chequesUIEvents = {
    newChequeButtonClick: () => {
      history.push("/cheques/new");
    },
    openEditChequeDialog: (id) => {
      history.push(`/cheques/${id}/edit`);
    },
    openDeleteChequeDialog: (id) => {
      history.push(`/cheques/${id}/delete`);
    },
    openDeleteChequesDialog: () => {
      history.push(`/cheques/deleteCheques`);
    },
    openFetchChequesDialog: () => {
      history.push(`/cheques/fetch`);
    },
    openUpdateChequesStatusDialog: () => {
      history.push("/cheques/updateStatus");
    },
  };

  return (
    <ChequesUIProvider chequesUIEvents={chequesUIEvents}>
      <ChequesLoadingDialog />
      <Route path="/cheques/new">
        {({ history, match }) => (
          <ChequeEditDialog
            show={match != null}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <Route path="/cheques/:id/edit">
        {({ history, match }) => (
          <ChequeEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <Route path="/cheques/deleteCheques">
        {({ history, match }) => (
          <ChequesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <Route path="/cheques/:id/delete">
        {({ history, match }) => (
          <ChequeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <Route path="/cheques/fetch">
        {({ history, match }) => (
          <ChequesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <Route path="/cheques/updateStatus">
        {({ history, match }) => (
          <ChequesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/cheques");
            }}
          />
        )}
      </Route>
      <ChequesCard />
    </ChequesUIProvider>
  );
}
