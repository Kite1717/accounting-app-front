import React from "react";
import { Route } from "react-router-dom";
import { UsersLoadingDialog } from "./users-loading-dialog/UsersLoadingDialog";
import { UserEditDialog } from "./user-edit-dialog/UserEditDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UsersDeleteDialog } from "./users-delete-dialog/UsersDeleteDialog";
import { UsersFetchDialog } from "./users-fetch-dialog/UsersFetchDialog";
import { UsersUpdateStateDialog } from "./users-update-status-dialog/UsersUpdateStateDialog";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersCard } from "./UsersCard";

export function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/users/new");
    },
    openEditUserDialog: (id) => {
      history.push(`/users/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/users/${id}/delete`);
    },
    openDeleteUsersDialog: () => {
      history.push(`/users/deleteUsers`);
    },
    openFetchUsersDialog: () => {
      history.push(`/users/fetch`);
    },
    openUpdateUsersStatusDialog: () => {
      history.push("/users/updateStatus");
    }
  }

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <UsersLoadingDialog />
      <Route path="/users/new">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/:id/edit">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/deleteUsers">
        {({ history, match }) => (
          <UsersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/fetch">
        {({ history, match }) => (
          <UsersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/updateStatus">
        {({ history, match }) => (
          <UsersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}
