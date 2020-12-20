import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ProductCategoryStatusCssClasses,
  ProductCategoryStatusTitles,
} from "../ProductCategoriesUIHelpers";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";
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

export function ProductCategoriesUpdateStateDialog({ show, onHide }) {
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
  const { productCategories, isLoading } = useSelector(
    (state) => ({
      productCategories: selectedProductCategories(
        state.productCategories.entities,
        productCategoriesUIProps.ids
      ),
      isLoading: state.productCategories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !productCategoriesUIProps.ids ||
      productCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategoriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update productCategories status by selected ids
    dispatch(
      actions.updateProductCategoriesStatus(
        productCategoriesUIProps.ids,
        status
      )
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
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected productCategories
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
