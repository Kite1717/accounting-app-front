import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ProductStatusCssClasses,
  ProductStatusTitles,
} from "../ProductsUIHelpers";
import * as actions from "../../../_redux/products/productsActions";
import { useProductsUIContext } from "../ProductsUIContext";

const selectedProducts = (entities, ids) => {
  const _products = [];
  ids.forEach((id) => {
    const product = entities.find((el) => el.id === id);
    if (product) {
      _products.push(product);
    }
  });
  return _products;
};

export function ProductsUpdateStateDialog({ show, onHide }) {
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
  const { products, isLoading } = useSelector(
    (state) => ({
      products: selectedProducts(
        state.products.entities,
        productsUIProps.ids
      ),
      isLoading: state.products.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!productsUIProps.ids || productsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update products status by selected ids
    dispatch(actions.updateProductsStatus(productsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchProducts(productsUIProps.queryParams)).then(
          () => {
            // clear selections list
            productsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected products
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>PRODUCT</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={`id${product.id}`}>
                <td>{product.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ProductStatusCssClasses[product.status]
                    } label-inline`}
                  >
                    {" "}
                    {ProductStatusTitles[product.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {product.lastName}, {product.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
