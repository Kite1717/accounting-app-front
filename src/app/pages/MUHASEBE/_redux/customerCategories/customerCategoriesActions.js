import * as requestFromServer from "./customerCategoriesCrud";
import { customerCategoriesSlice, callTypes } from "./customerCategoriesSlice";

const { actions } = customerCategoriesSlice;

export const fetchCustomerCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomerCategories(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.customerCategoriesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomerCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.customerCategoryFetched({ customerCategoryForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerCategoryById(id)
    .then((response) => {
      const customerCategory = response.data.customerCategory;
      dispatch(
        actions.customerCategoryFetched({
          customerCategoryForEdit: customerCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//add super customerCategory  category
export const addCustomerCategorySuperCategory = (values) => (dispatch) => {
  return requestFromServer
    .createSuperCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.superCategoryCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all super customerCategory category

export const fetchSuperCustomerCategoryCategory = () => (dispatch) => {
  return requestFromServer
    .findSuperCustomerCategoryCategories()
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.superCustomerCategoryCategoriesFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//add customerCategory category
export const addCategory = (values) => (dispatch) => {
  return requestFromServer
    .createCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.categoryCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//add customerCategory sub category
export const addSubCategory = (values) => (dispatch) => {
  return requestFromServer
    .createSubCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.categorySubCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all  customerCategory category

export const fetchCustomerCategoryCategory = () => (dispatch) => {
  return requestFromServer
    .findCustomerCategoryCategories()
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.customerCategoryCategoriesFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find customerCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteCustomerCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomerCategory(id)
    .then((response) => {
      dispatch(actions.customerCategoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customerCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomerCategory = (customerCategoryForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomerCategory(customerCategoryForCreation)
    .then((response) => {
      const { customerCategory } = response.data;
      dispatch(actions.customerCategoryCreated({ customerCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create customerCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomerCategory = (customerCategory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomerCategory(customerCategory)
    .then(() => {
      dispatch(actions.customerCategoryUpdated({ customerCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customerCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomerCategoriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomerCategories(ids, status)
    .then(() => {
      dispatch(actions.customerCategoriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customerCategories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomerCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomerCategories(ids)
    .then(() => {
      dispatch(actions.customerCategoriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customerCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
