import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CustomerCategoryEditDialogHeader({ id }) {
  // CustomerCategories Redux state
  const { customerCategoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      customerCategoryForEdit: state.customerCategories.customerCategoryForEdit,
      actionsLoading: state.customerCategories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Ürün";
    if (customerCategoryForEdit && id) {
      _title = `Ürünü düzenle  '${customerCategoryForEdit.customerCategoryName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerCategoryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
