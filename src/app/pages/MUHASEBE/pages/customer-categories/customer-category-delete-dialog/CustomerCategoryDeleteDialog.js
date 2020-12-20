import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/customerCategories/customerCategoriesActions";
import { useCustomerCategoriesUIContext } from "../CustomerCategoriesUIContext";

export function CustomerCategoryDeleteDialog({ id, show, onHide }) {
  // CustomerCategories UI Context
  const customerCategoriesUIContext = useCustomerCategoriesUIContext();
  const customerCategoriesUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCustomerCategory = () => {
    // server request for deleting customerCategory by id
    dispatch(actions.deleteCustomerCategory(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCustomerCategories(customerCategoriesUIProps.queryParams)
      );
      // clear selections list
      customerCategoriesUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          CustomerCategory Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this customerCategory?</span>
        )}
        {isLoading && <span>CustomerCategory is deleting...</span>}
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
            onClick={deleteCustomerCategory}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
