import { createSlice } from "@reduxjs/toolkit";

const initialOutlaysState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  outlayForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const outlaysSlice = createSlice({
  name: "outlays",
  initialState: initialOutlaysState,
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
    // getOutlayById
    outlayFetched: (state, action) => {
      state.actionsLoading = false;
      state.outlayForEdit = action.payload.outlayForEdit;
      state.error = null;
    },
    // findOutlays
    outlaysFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOutlay
    outlayCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.outlay);
    },
    // updateOutlay
    outlayUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.outlay.id) {
          return action.payload.outlay;
        }
        return entity;
      });
    },
    // deleteOutlay
    outlayDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteOutlays
    outlaysDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // outlaysUpdateState
    outlaysStatusUpdated: (state, action) => {
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
