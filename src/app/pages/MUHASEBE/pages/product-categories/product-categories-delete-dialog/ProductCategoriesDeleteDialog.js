import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";
import { useProductCategoriesUIContext } from "../ProductCategoriesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ProductCategoriesDeleteDialog({ show, onHide }) {
  // ProductCategories UI Context
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      ids: productCategoriesUIContext.ids,
      setIds: productCategoriesUIContext.setIds,
      queryParams: productCategoriesUIContext.queryParams,
    };
  }, [productCategoriesUIContext]);

  // ProductCategories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.productCategories.actionsLoading }),
    shallowEqual
  );

  // if productCategories weren't selected we should close modal
  useEffect(() => {
    if (
      !productCategoriesUIProps.ids ||
      productCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategoriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteProductCategories = () => {
    // server request for deleting productCategory by selected ids
    dispatch(
      actions.deleteProductCategories(productCategoriesUIProps.ids)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchProductCategories(productCategoriesUIProps.queryParams)
      ).then(() => {
        // clear selections list
        productCategoriesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          ProductCategories Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected productCategories?
          </span>
        )}
        {isLoading && <span>ProductCategory are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProductCategories}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
