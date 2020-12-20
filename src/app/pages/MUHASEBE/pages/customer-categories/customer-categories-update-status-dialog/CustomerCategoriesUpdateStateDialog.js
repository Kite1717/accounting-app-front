import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CustomerCategoryStatusCssClasses,
  CustomerCategoryStatusTitles,
} from "../CustomerCategoriesUIHelpers";
import * as actions from "../../../_redux/customerCategories/customerCategoriesActions";
import { useCustomerCategoriesUIContext } from "../CustomerCategoriesUIContext";

const selectedCustomerCategories = (entities, ids) => {
  const _customerCategories = [];
  ids.forEach((id) => {
    const customerCategory = entities.find((el) => el.id === id);
    if (customerCategory) {
      _customerCategories.push(customerCategory);
    }
  });
  return _customerCategories;
};

export function CustomerCategoriesUpdateStateDialog({ show, onHide }) {
  // CustomerCategories UI Context
  const customerCategoriesUIContext = useCustomerCategoriesUIContext();
  const customerCategoriesUIProps = useMemo(() => {
    return {
      ids: customerCategoriesUIContext.ids,
      setIds: customerCategoriesUIContext.setIds,
      queryParams: customerCategoriesUIContext.queryParams,
    };
  }, [customerCategoriesUIContext]);

  // CustomerCategories Redux state
  const { customerCategories, isLoading } = useSelector(
    (state) => ({
      customerCategories: selectedCustomerCategories(
        state.customerCategories.entities,
        customerCategoriesUIProps.ids
      ),
      isLoading: state.customerCategories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !customerCategoriesUIProps.ids ||
      customerCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCategoriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update customerCategories status by selected ids
    dispatch(
      actions.updateCustomerCategoriesStatus(
        customerCategoriesUIProps.ids,
        status
      )
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCustomerCategories(customerCategoriesUIProps.queryParams)
      ).then(() => {
        // clear selections list
        customerCategoriesUIProps.setIds([]);
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
          Status has been updated for selected customerCategories
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
            {customerCategories.map((customerCategory) => (
              <tr key={`id${customerCategory.id}`}>
                <td>{customerCategory.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      CustomerCategoryStatusCssClasses[customerCategory.status]
                    } label-inline`}
                  >
                    {" "}
                    {CustomerCategoryStatusTitles[customerCategory.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {customerCategory.lastName}, {customerCategory.firstName}
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
