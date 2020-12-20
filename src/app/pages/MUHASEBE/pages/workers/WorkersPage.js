import React from "react";
import { Route } from "react-router-dom";
import { WorkersLoadingDialog } from "./workers-loading-dialog/WorkersLoadingDialog";
import { WorkerEditDialog } from "./worker-edit-dialog/WorkerEditDialog";
import { WorkerDeleteDialog } from "./worker-delete-dialog/WorkerDeleteDialog";
import { WorkersDeleteDialog } from "./workers-delete-dialog/WorkersDeleteDialog";
import { WorkersFetchDialog } from "./workers-fetch-dialog/WorkersFetchDialog";
import { WorkersUpdateStateDialog } from "./workers-update-status-dialog/WorkersUpdateStateDialog";
import { WorkersUIProvider } from "./WorkersUIContext";
import { WorkersCard } from "./WorkersCard";

export function WorkersPage({ history }) {
  const workersUIEvents = {
    newWorkerButtonClick: () => {
      history.push("/workers/new");
    },
    openEditWorkerDialog: (id) => {
      history.push(`/workers/${id}/edit`);
    },
    openDeleteWorkerDialog: (id) => {
      history.push(`/workers/${id}/delete`);
    },
    openDeleteWorkersDialog: () => {
      history.push(`/workers/deleteWorkers`);
    },
    openFetchWorkersDialog: () => {
      history.push(`/workers/fetch`);
    },
    openUpdateWorkersStatusDialog: () => {
      history.push("/workers/updateStatus");
    },
  };

  return (
    <WorkersUIProvider workersUIEvents={workersUIEvents}>
      <WorkersLoadingDialog />
      <Route path="/workers/new">
        {({ history, match }) => (
          <WorkerEditDialog
            show={match != null}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <Route path="/workers/:id/edit">
        {({ history, match }) => (
          <WorkerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <Route path="/workers/deleteWorkers">
        {({ history, match }) => (
          <WorkersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <Route path="/workers/:id/delete">
        {({ history, match }) => (
          <WorkerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <Route path="/workers/fetch">
        {({ history, match }) => (
          <WorkersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <Route path="/workers/updateStatus">
        {({ history, match }) => (
          <WorkersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/workers");
            }}
          />
        )}
      </Route>
      <WorkersCard />
    </WorkersUIProvider>
  );
}
