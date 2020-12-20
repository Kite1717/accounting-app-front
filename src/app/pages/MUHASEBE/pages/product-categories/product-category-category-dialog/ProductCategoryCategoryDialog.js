import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";

import {
  ModalProgressBar,
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";
import { Formik, Field } from "formik";

export function ProductCategoryCategoryDialog({ show, onHide }) {
  // ProductCategories Redux state
  const dispatch = useDispatch();
  const { isLoading, superCategory } = useSelector(
    (state) => ({
      isLoading: state.productCategories.actionsLoading,
      superCategory: state.productCategories.superCategory,
    }),
    shallowEqual
  );

  const intl = useIntl();

  const addCategory = (values) => {
    // server request for deleting productCategory by selected ids
    dispatch(actions.addCategory(values)).then(() => {
      onHide();
    });
  };

  const [init, setInit] = useState(null);

  useEffect(() => {
    if (show) {
      dispatch(actions.fetchSuperProductCategoryCategory());
      setInit({
        title: "",
        superCategoryId: "1",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, dispatch]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={init}
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
              {intl.formatMessage({ id: "MENU.ADD.PRODUCT.CATEGORY" })}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select name="superCategoryId" label="Üst Kategoriler">
              {superCategory &&
                superCategory.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
            </Select>
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
