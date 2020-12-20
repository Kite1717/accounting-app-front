import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  CustomerCategoryStatusCssClasses,
  CustomerCategoryStatusTitles,
} from "../CustomerCategoriesUIHelpers";
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

export function CustomerCategoriesFetchDialog({ show, onHide }) {
  // CustomerCategories UI Context
  const customerCategoriesUIContext = useCustomerCategoriesUIContext();
  const customerCategoriesUIProps = useMemo(() => {
    return {
      ids: customerCategoriesUIContext.ids,
    };
  }, [customerCategoriesUIContext]);

  // CustomerCategories Redux state
  const { customerCategories } = useSelector(
    (state) => ({
      customerCategories: selectedCustomerCategories(
        state.customerCategories.entities,
        customerCategoriesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if customerCategories weren't selected we should close modal
  useEffect(() => {
    if (
      !customerCategoriesUIProps.ids ||
      customerCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCategoriesUIProps.ids]);

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
