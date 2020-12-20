import * as requestFromServer from "./customersCrud";
import { customersSlice, callTypes } from "./customersSlice";

const { actions } = customersSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.customersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomerRealCount = () => (dispatch) => {
 
  return requestFromServer
    .findAllRealCustomerCount()
    .then((response) => {
      const { totalCount } = response.data;
      dispatch(actions.customersAllCountFetched({ totalCount}));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};









//add customer category
export const addCustomerCategory = (values) => (dispatch) => {
  return requestFromServer
    .createCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.categoryCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//add customer sub category

export const addCustomerSubCategory = (values) => (dispatch) => {
  return requestFromServer
    .createSubCategory(values)
    .then((response) => {
      const { subCategory } = response.data;
      dispatch(actions.categoryCreated({ subCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all customer category

export const fetchCategories = () => (dispatch) => {
  return requestFromServer
    .findCategories()
    .then((response) => {
      const { entities } = response.data;
      dispatch(actions.categoriesFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fecth all categories of hgave sub category

export const fetchCategoriesHaveSub = () => (dispatch) => {
  return requestFromServer
    .findCategoriesHaveSub()
    .then((response) => {
      const { entities } = response.data;
      dispatch(actions.haveCategoriesOfSubFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all customer sub category

export const fetchSubCategories = () => (dispatch) => {
  return requestFromServer
    .findSubCategories()
    .then((response) => {
      const { entities } = response.data;
      dispatch(actions.subCategoriesFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch cities

export const fetchCities = () => (dispatch) => {
  return requestFromServer
    .findCities()
    .then((response) => {
      const { entities } = response.data;
      dispatch(actions.citiesFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTowns = () => (dispatch) => {
  return requestFromServer
    .findTowns()
    .then((response) => {
      const { entities } = response.data;
      dispatch(actions.townsFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find towns";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUsers = () => (dispatch) => {
  return requestFromServer
    .findUsers()
    .then((response) => {
      const { entities } = response.data;

      dispatch(actions.usersFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ customerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const customer = response.data;
      dispatch(actions.customerFetched({ customerForEdit: customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then((response) => {
      dispatch(actions.customerDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const { customer } = response.data;
      dispatch(actions.customerCreated({ customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = (customer) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(customer)
    .then(() => {
      dispatch(actions.customerUpdated({ customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then(() => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then(() => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
