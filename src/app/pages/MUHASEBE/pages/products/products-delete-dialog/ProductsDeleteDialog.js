import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import { useProductsUIContext } from "../ProductsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ProductsDeleteDialog({ show, onHide }) {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
    };
  }, [productsUIContext]);

  // Products Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.products.actionsLoading }),
    shallowEqual
  );

  // if products weren't selected we should close modal
  useEffect(() => {
    if (!productsUIProps.ids || productsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteProducts = () => {
    // server request for deleting product by selected ids
    dispatch(actions.deleteProducts(productsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProducts(productsUIProps.queryParams)).then(
        () => {
          // clear selections list
          productsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Products Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected products?</span>
        )}
        {isLoading && <span>Product are deleting...</span>}
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
            onClick={deleteProducts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
