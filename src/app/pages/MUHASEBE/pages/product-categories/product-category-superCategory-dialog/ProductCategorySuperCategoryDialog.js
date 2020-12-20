import React from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";
import {
  ModalProgressBar,
  Input,
} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";
import { Formik, Field } from "formik";

export function ProductCategorySuperCategoryDialog({ show, onHide }) {
  // ProductCategories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.productCategories.actionsLoading }),
    shallowEqual
  );

  const intl = useIntl();

  const addCategory = (values) => {
    // server request for deleting productCategory by selected ids
    dispatch(actions.addProductCategorySuperCategory(values)).then(() => {
      onHide();
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: "",
      }}
      onSubmit={(values, { resetForm }) => {
        if (values.title !== "") {
          addCategory(values);
          resetForm();
        }
      }}
    >
      {({ handleSubmit }) => (
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
              {intl.formatMessage({ id: "MENU.ADD.PRODUCT.SUPER_CATEGORY" })}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              name="title"
              component={Input}
              placeholder="Ad"
              label="Kategori Adı"
            />
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {intl.formatMessage({ id: "MENU.CANCEL" })}
              </button>
              <> </>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary btn-elevate"
              >
                {intl.formatMessage({ id: "MENU.ADD" })}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
}
