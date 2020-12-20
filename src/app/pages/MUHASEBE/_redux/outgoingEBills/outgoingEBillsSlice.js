import { createSlice } from "@reduxjs/toolkit";

const initialOutgoingEBillsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  outgoingEBillForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const outgoingEBillsSlice = createSlice({
  name: "outgoingEBills",
  initialState: initialOutgoingEBillsState,
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
    // getOutgoingEBillById
    outgoingEBillFetched: (state, action) => {
      state.actionsLoading = false;
      state.outgoingEBillForEdit = action.payload.outgoingEBillForEdit;
      state.error = null;
    },
    // findOutgoingEBills
    outgoingEBillsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOutgoingEBill
    outgoingEBillCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.outgoingEBill);
    },
    // updateOutgoingEBill
    outgoingEBillUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.outgoingEBill.id) {
          return action.payload.outgoingEBill;
        }
        return entity;
      });
    },
    // deleteOutgoingEBill
    outgoingEBillDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteOutgoingEBills
    outgoingEBillsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // outgoingEBillsUpdateState
    outgoingEBillsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
