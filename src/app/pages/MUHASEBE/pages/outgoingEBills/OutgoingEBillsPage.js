import React from "react";
import { Route } from "react-router-dom";
import { OutgoingEBillsLoadingDialog } from "./outgoingEBills-loading-dialog/OutgoingEBillsLoadingDialog";
import { OutgoingEBillEditDialog } from "./outgoingEBill-edit-dialog/OutgoingEBillEditDialog";
import { OutgoingEBillDeleteDialog } from "./outgoingEBill-delete-dialog/OutgoingEBillDeleteDialog";
import { OutgoingEBillsDeleteDialog } from "./outgoingEBills-delete-dialog/OutgoingEBillsDeleteDialog";
import { OutgoingEBillsFetchDialog } from "./outgoingEBills-fetch-dialog/OutgoingEBillsFetchDialog";
import { OutgoingEBillsUpdateStateDialog } from "./outgoingEBills-update-status-dialog/OutgoingEBillsUpdateStateDialog";
import { OutgoingEBillsUIProvider } from "./OutgoingEBillsUIContext";
import { OutgoingEBillsCard } from "./OutgoingEBillsCard";

export function OutgoingEBillsPage({ history }) {
  const outgoingEBillsUIEvents = {
    newOutgoingEBillButtonClick: () => {
      history.push("/e-document/outgoing/new");
    },
    openEditOutgoingEBillDialog: (id) => {
      history.push(`/e-document/outgoing/${id}/edit`);
    },
    openDeleteOutgoingEBillDialog: (id) => {
      history.push(`/e-document/outgoing/${id}/delete`);
    },
    openDeleteOutgoingEBillsDialog: () => {
      history.push(`/e-document/outgoing/deleteOutgoingEBills`);
    },
    openFetchOutgoingEBillsDialog: () => {
      history.push(`/e-document/outgoing/fetch`);
    },
    openUpdateOutgoingEBillsStatusDialog: () => {
      history.push("/e-document/outgoing/updateStatus");
    }
  }

  return (
    <OutgoingEBillsUIProvider outgoingEBillsUIEvents={outgoingEBillsUIEvents}>
      <OutgoingEBillsLoadingDialog />
      <Route path="/e-document/outgoing/new">
        {({ history, match }) => (
          <OutgoingEBillEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/outgoing/:id/edit">
        {({ history, match }) => (
          <OutgoingEBillEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/outgoing/deleteOutgoingEBills">
        {({ history, match }) => (
          <OutgoingEBillsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/outgoing/:id/delete">
        {({ history, match }) => (
          <OutgoingEBillDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/outgoing/fetch">
        {({ history, match }) => (
          <OutgoingEBillsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <Route path="/e-document/outgoing/updateStatus">
        {({ history, match }) => (
          <OutgoingEBillsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/e-document/outgoing");
            }}
          />
        )}
      </Route>
      <OutgoingEBillsCard />
    </OutgoingEBillsUIProvider>
  );
}
