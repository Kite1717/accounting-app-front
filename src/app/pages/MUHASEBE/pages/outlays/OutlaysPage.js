import React from "react";
import { Route } from "react-router-dom";
import { OutlaysLoadingDialog } from "./outlays-loading-dialog/OutlaysLoadingDialog";
import { OutlayEditDialog } from "./outlay-edit-dialog/OutlayEditDialog";
import { OutlayDeleteDialog } from "./outlay-delete-dialog/OutlayDeleteDialog";
import { OutlaysDeleteDialog } from "./outlays-delete-dialog/OutlaysDeleteDialog";
import { OutlaysFetchDialog } from "./outlays-fetch-dialog/OutlaysFetchDialog";
import { OutlaysUpdateStateDialog } from "./outlays-update-status-dialog/OutlaysUpdateStateDialog";
import { OutlaysUIProvider } from "./OutlaysUIContext";
import { OutlaysCard } from "./OutlaysCard";

export function OutlaysPage({ history }) {
  const outlaysUIEvents = {
    newOutlayButtonClick: () => {
      history.push("/outlays/new");
    },
    openEditOutlayDialog: (id) => {
      history.push(`/outlays/${id}/edit`);
    },
    openDeleteOutlayDialog: (id) => {
      history.push(`/outlays/${id}/delete`);
    },
    openDeleteOutlaysDialog: () => {
      history.push(`/outlays/deleteOutlays`);
    },
    openFetchOutlaysDialog: () => {
      history.push(`/outlays/fetch`);
    },
    openUpdateOutlaysStatusDialog: () => {
      history.push("/outlays/updateStatus");
    },
  };

  return (
    <OutlaysUIProvider outlaysUIEvents={outlaysUIEvents}>
      <OutlaysLoadingDialog />
      <Route path="/outlays/new">
        {({ history, match }) => (
          <OutlayEditDialog
            show={match != null}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <Route path="/outlays/:id/edit">
        {({ history, match }) => (
          <OutlayEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <Route path="/outlays/deleteOutlays">
        {({ history, match }) => (
          <OutlaysDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <Route path="/outlays/:id/delete">
        {({ history, match }) => (
          <OutlayDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <Route path="/outlays/fetch">
        {({ history, match }) => (
          <OutlaysFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <Route path="/outlays/updateStatus">
        {({ history, match }) => (
          <OutlaysUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/outlays");
            }}
          />
        )}
      </Route>
      <OutlaysCard />
    </OutlaysUIProvider>
  );
}
