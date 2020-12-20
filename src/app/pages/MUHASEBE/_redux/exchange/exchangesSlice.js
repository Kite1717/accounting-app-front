import { createSlice } from "@reduxjs/toolkit";

const initialExchangesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  exchangeForEdit: undefined,
  lastError: null,
  exchangeForTRY: undefined,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const exchangesSlice = createSlice({
  name: "exchanges",
  initialState: initialExchangesState,
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

    exchangeFetchedByTRY: (state, action) => {
      state.actionsLoading = false;
      state.exchangeForTRY = action.payload.exchangesForTRY;
      state.error = null;
    },


    // getExchangeById
    exchangeFetched: (state, action) => {
      state.actionsLoading = false;
      state.exchangeForEdit = action.payload.exchangeForEdit;
      state.error = null;
    },
    // findExchanges
    exchangesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createExchange
    exchangeCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.exchange);
    },
    // updateExchange
    exchangeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.exchange.id) {
          return action.payload.exchange;
        }
        return entity;
      });
    },
    // deleteExchange
    exchangeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteExchanges
    exchangesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // exchangesUpdateState
    exchangesStatusUpdated: (state, action) => {
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
