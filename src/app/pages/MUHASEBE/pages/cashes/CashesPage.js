import React from "react";
import { Route } from "react-router-dom";
import { CashesLoadingDialog } from "./cashes-loading-dialog/CashesLoadingDialog";
import { CashEditDialog } from "./cash-edit-dialog/CashEditDialog";
import { CashDeleteDialog } from "./cash-delete-dialog/CashDeleteDialog";
import { CashesDeleteDialog } from "./cashes-delete-dialog/CashesDeleteDialog";
import { CashesFetchDialog } from "./cashes-fetch-dialog/CashesFetchDialog";
import { CashesUpdateStateDialog } from "./cashes-update-status-dialog/CashesUpdateStateDialog";
import { CashesUIProvider } from "./CashesUIContext";
import { CashesCard } from "./CashesCard";

export function CashesPage({ history }) {
  const cashesUIEvents = {
    newCashButtonClick: () => {
      history.push("/cashes/new");
    },
    openEditCashDialog: (id) => {
      history.push(`/cashes/${id}/edit`);
    },
    openDeleteCashDialog: (id) => {
      history.push(`/cashes/${id}/delete`);
    },
    openDeleteCashesDialog: () => {
      history.push(`/cashes/deleteCashes`);
    },
    openFetchCashesDialog: () => {
      history.push(`/cashes/fetch`);
    },
    openUpdateCashesStatusDialog: () => {
      history.push("/cashes/updateStatus");
    },
  };

  return (
    <CashesUIProvider cashesUIEvents={cashesUIEvents}>
      <CashesLoadingDialog />
      <Route path="/cashes/new">
        {({ history, match }) => (
          <CashEditDialog
            show={match != null}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <Route path="/cashes/:id/edit">
        {({ history, match }) => (
          <CashEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <Route path="/cashes/deleteCashes">
        {({ history, match }) => (
          <CashesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <Route path="/cashes/:id/delete">
        {({ history, match }) => (
          <CashDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <Route path="/cashes/fetch">
        {({ history, match }) => (
          <CashesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <Route path="/cashes/updateStatus">
        {({ history, match }) => (
          <CashesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/cashes");
            }}
          />
        )}
      </Route>
      <CashesCard />
    </CashesUIProvider>
  );
}
