import * as requestFromServer from "./productCategoriesCrud";
import { productCategoriesSlice, callTypes } from "./productCategoriesSlice";

const { actions } = productCategoriesSlice;

export const fetchProductCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProductCategories(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.productCategoriesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProductCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.productCategoryFetched({ productCategoryForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductCategoryById(id)
    .then((response) => {
      const productCategory = response.data.productCategory;
      dispatch(
        actions.productCategoryFetched({
          productCategoryForEdit: productCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//add super productCategory  category
export const addProductCategorySuperCategory = (values) => (dispatch) => {
  return requestFromServer
    .createSuperCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.superCategoryCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all super productCategory category

export const fetchSuperProductCategoryCategory = () => (dispatch) => {
  return requestFromServer
    .findSuperProductCategoryCategories()
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.superProductCategoryCategoriesFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//add productCategory category
export const addCategory = (values) => (dispatch) => {
  return requestFromServer
    .createCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.categoryCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//add productCategory sub category
export const addSubCategory = (values) => (dispatch) => {
  return requestFromServer
    .createSubCategory(values)
    .then((response) => {
      const { category } = response.data;
      dispatch(actions.categorySubCreated({ category }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory super category";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

//fetch all  productCategory category

export const fetchProductCategoryCategory = () => (dispatch) => {
  return requestFromServer
    .findProductCategoryCategories()
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.productCategoryCategoriesFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteProductCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductCategory(id)
    .then((response) => {
      dispatch(actions.productCategoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProductCategory = (productCategoryForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProductCategory(productCategoryForCreation)
    .then((response) => {
      const { productCategory } = response.data;
      dispatch(actions.productCategoryCreated({ productCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProductCategory = (productCategory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProductCategory(productCategory)
    .then(() => {
      dispatch(actions.productCategoryUpdated({ productCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProductCategoriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProductCategories(ids, status)
    .then(() => {
      dispatch(actions.productCategoriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update productCategories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProductCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductCategories(ids)
    .then(() => {
      dispatch(actions.productCategoriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
