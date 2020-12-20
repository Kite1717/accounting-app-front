import React from "react";
import { Route } from "react-router-dom";
import { IncomingEBillsLoadingDialog } from "./incomingEBills-loading-dialog/IncomingEBillsLoadingDialog";
import { IncomingEBillEditDialog } from "./incomingEBill-edit-dialog/IncomingEBillEditDialog";
import { IncomingEBillDeleteDialog } from "./incomingEBill-delete-dialog/IncomingEBillDeleteDialog";
import { IncomingEBillsDeleteDialog } from "./incomingEBills-delete-dialog/IncomingEBillsDeleteDialog";
import { IncomingEBillsFetchDialog } from "./incomingEBills-fetch-dialog/IncomingEBillsFetchDialog";
import { IncomingEBillsUpdateStateDialog } from "./incomingEBills-update-status-dialog/IncomingEBillsUpdateStateDialog";
import { IncomingEBillsUIProvider } from "./IncomingEBillsUIContext";
import { IncomingEBillsCard } from "./IncomingEBillsCard";

export function IncomingEBillsPage({ history }) {
  const incomingEBillsUIEvents = {
    newIncomingEBillButtonClick: () => {
      history.push("/e-document/incoming/new");
    },
    openEditIncomingEBillDialog: (id) => {
      history.push(`/e-document/incoming/${id}/edit`);
    },
    openDeleteIncomingEBillDialog: (id) => {
      history.push(`/e-document/incoming/${id}/delete`);
    },
    openDeleteIncomingEBillsDialog: () => {
      history.push(`/e-document/incoming/deleteIncomingEBills`);
    },
    openFetchIncomingEBillsDialog: () => {
      history.push(`/e-document/incoming/fetch`);
    },
    openUpdateIncomingEBillsStatusDialog: () => {
      history.push("/e-document/incoming/updateStatus");
    }
  }

  return (
    <IncomingEBillsUIProvider incomingEBillsUIEvents={incomingEBillsUIEvents}>
      <IncomingEBillsLoadingDialog />
      <Route path="/e-document/incoming/new">
        {({ history, match }) => (
          <IncomingEBillEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/incoming/:id/edit">
        {({ history, match }) => (
          <IncomingEBillEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/incoming/deleteIncomingEBills">
        {({ history, match }) => (
          <IncomingEBillsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/incoming/:id/delete">
        {({ history, match }) => (
          <IncomingEBillDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/incoming/fetch">
        {({ history, match }) => (
          <IncomingEBillsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/incoming/updateStatus">
        {({ history, match }) => (
          <IncomingEBillsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/incoming");
            }}
          />
        )}
      </Route>
      <IncomingEBillsCard />
    </IncomingEBillsUIProvider>
  );
}
