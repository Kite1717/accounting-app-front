import { createSlice } from "@reduxjs/toolkit";

const initialCustomerCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  customerCategoryForEdit: undefined,
  lastError: null,
  superCategory: null,
  category: null,
  subCategory: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const customerCategoriesSlice = createSlice({
  name: "customerCategories",
  initialState: initialCustomerCategoriesState,
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
    // getCustomerCategoryById
    customerCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.customerCategoryForEdit = action.payload.customerCategoryForEdit;
      state.error = null;
    },
    // findCustomerCategories
    customerCategoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCustomerCategory
    customerCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.customerCategory);
    },

    // create super customerCategory category
    superCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.superCategory.push(action.payload.category);
    },

    //fetch all super categories
    superCustomerCategoryCategoriesFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.superCategory = entities;
    },

    //fetch all categories
    customerCategoryCategoriesFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.category = entities;
    },

    //  create customerCategory category
    categoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.category.push(action.payload.category);
    },

    // create sub customerCategory category
    subCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.subCategory.push(action.payload.category);
    },

    // updateCustomerCategory
    customerCategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.customerCategory.id) {
          return action.payload.customerCategory;
        }
        return entity;
      });
    },
    // deleteCustomerCategory
    customerCategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCustomerCategories
    customerCategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // customerCategoriesUpdateState
    customerCategoriesStatusUpdated: (state, action) => {
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
