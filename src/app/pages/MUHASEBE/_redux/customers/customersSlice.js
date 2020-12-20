import {createSlice} from "@reduxjs/toolkit";

const initialCustomersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  payer : null,
  nonPayer : null,
  customerForEdit: undefined,
  lastError: null,
  cities:null,
  towns:null,
  users: null,
  categories : null ,
  subCategories : null ,
  haveCategoriesOfSub : null,
  realTotalCount:0,

};
export const callTypes = {
  list: "list",
  action: "action"
};

export const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomersState,
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
    // getCustomerById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      state.customerForEdit = action.payload.customerForEdit;
      state.error = null;
    },
    // findCustomers
    customersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;

    },

    customersAllCountFetched: (state, action) => {
      const { totalCount } = action.payload;
      
      state.realTotalCount = totalCount;

    },

    

    



    //fetch all cities
    citiesFetched: (state, action) => {
      const { entities } = action.payload;

     
      state.cities = entities;
    },

    //fetch all categories

    categoriesFetched: (state, action) => {
      const { entities } = action.payload;

      
      state.categories = entities;
    },

    //fetch all categories of have sub category
    haveCategoriesOfSubFetched: (state, action) => {
      const { entities } = action.payload;

      
      state.haveCategoriesOfSub = entities;
    },

    

    //fetch all sub categories
    

    subCategoriesFetched: (state, action) => {
      const { entities } = action.payload;

  
      state.subCategories = entities;
    },


    //fetch all towns
    townsFetched: (state, action) => {
      const { entities } = action.payload;
     
      state.towns = entities;
    },
    //fetch all users
    usersFetched: (state, action) => {
      const { entities } = action.payload;
  
      state.users = entities;
    },

    // createCustomer
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.customer);
    },
    // updateCustomer
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.customer.id) {
          return action.payload.customer;
        }
        return entity;
      });
    },
    // deleteCustomer
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteCustomers
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // customersUpdateState
    customersStatusUpdated: (state, action) => {
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
