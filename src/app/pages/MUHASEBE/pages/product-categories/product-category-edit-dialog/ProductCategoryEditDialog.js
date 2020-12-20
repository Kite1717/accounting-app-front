import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";
import { ProductCategoryEditDialogHeader } from "./ProductCategoryEditDialogHeader";
import { ProductCategoryEditForm } from "./ProductCategoryEditForm";
import { useProductCategoriesUIContext } from "../ProductCategoriesUIContext";

export function ProductCategoryEditDialog({ id, show, onHide }) {
  // ProductCategories UI Context
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      initProductCategory: productCategoriesUIContext.initProductCategory,
    };
  }, [productCategoriesUIContext]);

  // ProductCategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, productCategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.productCategories.actionsLoading,
      productCategoryForEdit: state.productCategories.productCategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ProductCategory by id
    dispatch(actions.fetchProductCategory(id));
  }, [id, dispatch]);

  // server request for saving productCategory
  const saveProductCategory = (productCategory) => {
    if (!id) {
      // server request for creating productCategory
      dispatch(actions.createProductCategory(productCategory)).then(() =>
        onHide()
      );
    } else {
      // server request for updating productCategory
      dispatch(actions.updateProductCategory(productCategory)).then(() =>
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
      <ProductCategoryEditDialogHeader id={id} />
      <ProductCategoryEditForm
        saveProductCategory={saveProductCategory}
        actionsLoading={actionsLoading}
        productCategory={
          productCategoryForEdit || productCategoriesUIProps.initProductCategory
        }
        onHide={onHide}
      />
    </Modal>
  );
}
