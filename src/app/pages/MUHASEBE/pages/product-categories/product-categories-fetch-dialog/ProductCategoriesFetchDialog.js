import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ProductCategoryStatusCssClasses,
  ProductCategoryStatusTitles,
} from "../ProductCategoriesUIHelpers";
import { useProductCategoriesUIContext } from "../ProductCategoriesUIContext";

const selectedProductCategories = (entities, ids) => {
  const _productCategories = [];
  ids.forEach((id) => {
    const productCategory = entities.find((el) => el.id === id);
    if (productCategory) {
      _productCategories.push(productCategory);
    }
  });
  return _productCategories;
};

export function ProductCategoriesFetchDialog({ show, onHide }) {
  // ProductCategories UI Context
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      ids: productCategoriesUIContext.ids,
    };
  }, [productCategoriesUIContext]);

  // ProductCategories Redux state
  const { productCategories } = useSelector(
    (state) => ({
      productCategories: selectedProductCategories(
        state.productCategories.entities,
        productCategoriesUIProps.ids
      ),
    }),
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
            {productCategories.map((productCategory) => (
              <tr key={`id${productCategory.id}`}>
                <td>{productCategory.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ProductCategoryStatusCssClasses[productCategory.status]
                    } label-inline`}
                  >
                    {" "}
                    {ProductCategoryStatusTitles[productCategory.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {productCategory.lastName}, {productCategory.firstName}
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
