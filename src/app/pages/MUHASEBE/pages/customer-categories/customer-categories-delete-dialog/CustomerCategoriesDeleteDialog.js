import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/customerCategories/customerCategoriesActions";
import { useCustomerCategoriesUIContext } from "../CustomerCategoriesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CustomerCategoriesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customerCategories.actionsLoading }),
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

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCustomerCategories = () => {
    // server request for deleting customerCategory by selected ids
    dispatch(
      actions.deleteCustomerCategories(customerCategoriesUIProps.ids)
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          CustomerCategories Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected customerCategories?
          </span>
        )}
        {isLoading && <span>CustomerCategory are deleting...</span>}
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
            onClick={deleteCustomerCategories}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
