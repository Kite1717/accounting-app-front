import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/customerCategories/customerCategoriesActions";
import { CustomerCategoryEditDialogHeader } from "./CustomerCategoryEditDialogHeader";
import { CustomerCategoryEditForm } from "./CustomerCategoryEditForm";
import { useCustomerCategoriesUIContext } from "../CustomerCategoriesUIContext";

export function CustomerCategoryEditDialog({ id, show, onHide }) {
  // CustomerCategories UI Context
  const customerCategoriesUIContext = useCustomerCategoriesUIContext();
  const customerCategoriesUIProps = useMemo(() => {
    return {
      initCustomerCategory: customerCategoriesUIContext.initCustomerCategory,
    };
  }, [customerCategoriesUIContext]);

  // CustomerCategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, customerCategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.customerCategories.actionsLoading,
      customerCategoryForEdit: state.customerCategories.customerCategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CustomerCategory by id
    dispatch(actions.fetchCustomerCategory(id));
  }, [id, dispatch]);

  // server request for saving customerCategory
  const saveCustomerCategory = (customerCategory) => {
    if (!id) {
      // server request for creating customerCategory
      dispatch(actions.createCustomerCategory(customerCategory)).then(() =>
        onHide()
      );
    } else {
      // server request for updating customerCategory
      dispatch(actions.updateCustomerCategory(customerCategory)).then(() =>
        onHide()
      );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerCategoryEditDialogHeader id={id} />
      <CustomerCategoryEditForm
        saveCustomerCategory={saveCustomerCategory}
        actionsLoading={actionsLoading}
        customerCategory={
          customerCategoryForEdit ||
          customerCategoriesUIProps.initCustomerCategory
        }
        onHide={onHide}
      />
    </Modal>
  );
}
