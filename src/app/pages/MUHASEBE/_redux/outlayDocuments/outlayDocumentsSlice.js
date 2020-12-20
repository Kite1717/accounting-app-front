import { createSlice } from "@reduxjs/toolkit";

const initialOutlayDocumentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  outlayDocumentForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const outlayDocumentsSlice = createSlice({
  name: "outlayDocuments",
  initialState: initialOutlayDocumentsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getOutlayDocumentById
    outlayDocumentFetched: (state, action) => {
      state.actionsLoading = false;
      state.outlayDocumentForEdit = action.payload.outlayDocumentForEdit;
      state.error = null;
    },
    // findOutlayDocuments
    outlayDocumentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOutlayDocument
    outlayDocumentCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.outlayDocument);
    },
    // updateOutlayDocument
    outlayDocumentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.outlayDocument.id) {
          return action.payload.outlayDocument;
        }
        return entity;
      });
    },
    // deleteOutlayDocument
    outlayDocumentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteOutlayDocuments
    outlayDocumentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // outlayDocumentsUpdateState
    outlayDocumentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
