import React from "react";
import { Route } from "react-router-dom";
import { BanksLoadingDialog } from "./banks-loading-dialog/BanksLoadingDialog";
import { BankEditDialog } from "./bank-edit-dialog/BankEditDialog";
import { CaseEditDialog } from "./case-edit-dialog/CaseEditDialog";
import { BankDeleteDialog } from "./bank-delete-dialog/BankDeleteDialog";
import { BanksDeleteDialog } from "./banks-delete-dialog/BanksDeleteDialog";
import { BanksFetchDialog } from "./banks-fetch-dialog/BanksFetchDialog";
import { BanksUpdateStateDialog } from "./banks-update-status-dialog/BanksUpdateStateDialog";
import { BanksUIProvider } from "./BanksUIContext";
import { BanksCard } from "./BanksCard";
import { BankDetailsDialog } from "./bank-details-dialog/BankDetailsDialog";

export function BanksPage({ history }) {
  const banksUIEvents = {
    newBankButtonClick: () => {
      history.push("/banks/new");
    },
    newCaseButtonClick: () => {
      history.push("/banks/case/new");
    },
    openDetailBankDialog: (id) => {
      history.push(`/banks/${id}/details`);
    },
    openEditBankDialog: (id) => {
      history.push(`/banks/${id}/edit`);
    },
    openDeleteBankDialog: (id) => {
      history.push(`/banks/${id}/delete`);
    },
    openDeleteBanksDialog: () => {
      history.push(`/banks/deleteBanks`);
    },
    openFetchBanksDialog: () => {
      history.push(`/banks/fetch`);
    },
    openUpdateBanksStatusDialog: () => {
      history.push("/banks/updateStatus");
    },
  };

  return (
    <BanksUIProvider banksUIEvents={banksUIEvents}>
      <BanksLoadingDialog />
      <Route path="/banks/new">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/case/new">
        {({ history, match }) => (
          <CaseEditDialog
            show={match != null}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/:id/details">
        {({ history, match }) => (
          <BankDetailsDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/:id/edit">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/deleteBanks">
        {({ history, match }) => (
          <BanksDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/:id/delete">
        {({ history, match }) => (
          <BankDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/fetch">
        {({ history, match }) => (
          <BanksFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <Route path="/banks/updateStatus">
        {({ history, match }) => (
          <BanksUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/banks");
            }}
          />
        )}
      </Route>
      <BanksCard />
    </BanksUIProvider>
  );
}
