import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ProductStatusCssClasses,
  ProductStatusTitles,
} from "../ProductsUIHelpers";
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

export function ProductsFetchDialog({ show, onHide }) {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
    };
  }, [productsUIContext]);

  // Products Redux state
  const { products } = useSelector(
    (state) => ({
      products: selectedProducts(
        state.products.entities,
        productsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if products weren't selected we should close modal
  useEffect(() => {
    if (!productsUIProps.ids || productsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
