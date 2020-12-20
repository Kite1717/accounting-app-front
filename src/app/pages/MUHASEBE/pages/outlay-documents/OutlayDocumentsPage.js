import React from "react";
import { Route } from "react-router-dom";
import { OutlayDocumentsLoadingDialog } from "./outlay-documents-loading-dialog/OutlayDocumentsLoadingDialog";
import { OutlayDocumentEditDialog } from "./outlay-document-edit-dialog/OutlayDocumentEditDialog";
import { OutlayDocumentDeleteDialog } from "./outlay-document-delete-dialog/OutlayDocumentDeleteDialog";
import { OutlayDocumentsDeleteDialog } from "./outlay-documents-delete-dialog/OutlayDocumentsDeleteDialog";
import { OutlayDocumentsFetchDialog } from "./outlay-documents-fetch-dialog/OutlayDocumentsFetchDialog";
import { OutlayDocumentsUpdateStateDialog } from "./outlay-documents-update-status-dialog/OutlayDocumentsUpdateStateDialog";
import { OutlayDocumentsUIProvider } from "./OutlayDocumentsUIContext";
import { OutlayDocumentsCard } from "./OutlayDocumentsCard";

export function OutlayDocumentsPage({ history }) {
  const outlayDocumentsUIEvents = {
    newOutlayDocumentButtonClick: () => {
      history.push("/outlay-documents/new");
    },
    openEditOutlayDocumentDialog: (id) => {
      history.push(`/outlay-documents/${id}/edit`);
    },
    openDeleteOutlayDocumentDialog: (id) => {
      history.push(`/outlay-documents/${id}/delete`);
    },
    openDeleteOutlayDocumentsDialog: () => {
      history.push(`/outlay-documents/deleteOutlayDocuments`);
    },
    openFetchOutlayDocumentsDialog: () => {
      history.push(`/outlay-documents/fetch`);
    },
    openUpdateOutlayDocumentsStatusDialog: () => {
      history.push("/outlay-documents/updateStatus");
    },
  };

  return (
    <OutlayDocumentsUIProvider
      outlayDocumentsUIEvents={outlayDocumentsUIEvents}
    >
      <OutlayDocumentsLoadingDialog />
      <Route path="/outlay-documents/new">
        {({ history, match }) => (
          <OutlayDocumentEditDialog
            show={match != null}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <Route path="/outlay-documents/:id/edit">
        {({ history, match }) => (
          <OutlayDocumentEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <Route path="/outlay-documents/deleteOutlayDocuments">
        {({ history, match }) => (
          <OutlayDocumentsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <Route path="/outlay-documents/:id/delete">
        {({ history, match }) => (
          <OutlayDocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <Route path="/outlay-documents/fetch">
        {({ history, match }) => (
          <OutlayDocumentsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <Route path="/outlay-documents/updateStatus">
        {({ history, match }) => (
          <OutlayDocumentsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/outlay-documents");
            }}
          />
        )}
      </Route>
      <OutlayDocumentsCard />
    </OutlayDocumentsUIProvider>
  );
}
