import { createSlice } from "@reduxjs/toolkit";

const initialIncomingEBillsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  incomingEBillForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const incomingEBillsSlice = createSlice({
  name: "incomingEBills",
  initialState: initialIncomingEBillsState,
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
    // getIncomingEBillById
    incomingEBillFetched: (state, action) => {
      state.actionsLoading = false;
      state.incomingEBillForEdit = action.payload.incomingEBillForEdit;
      state.error = null;
    },
    // findIncomingEBills
    incomingEBillsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIncomingEBill
    incomingEBillCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.incomingEBill);
    },
    // updateIncomingEBill
    incomingEBillUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.incomingEBill.id) {
          return action.payload.incomingEBill;
        }
        return entity;
      });
    },
    // deleteIncomingEBill
    incomingEBillDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteIncomingEBills
    incomingEBillsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // incomingEBillsUpdateState
    incomingEBillsStatusUpdated: (state, action) => {
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
