import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ProductCategoryEditDialogHeader({ id }) {
  // ProductCategories Redux state
  const { productCategoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      productCategoryForEdit: state.productCategories.productCategoryForEdit,
      actionsLoading: state.productCategories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Ürün";
    if (productCategoryForEdit && id) {
      _title = `Ürünü düzenle  '${productCategoryForEdit.productCategoryName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [productCategoryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
