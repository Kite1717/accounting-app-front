import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  SupplierStatusCssClasses,
  SupplierStatusTitles,
} from "../SuppliersUIHelpers";
import { useSuppliersUIContext } from "../SuppliersUIContext";

const selectedSuppliers = (entities, ids) => {
  const _suppliers = [];
  ids.forEach((id) => {
    const supplier = entities.find((el) => el.id === id);
    if (supplier) {
      _suppliers.push(supplier);
    }
  });
  return _suppliers;
};

export function SuppliersFetchDialog({ show, onHide }) {
  // Suppliers UI Context
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      ids: suppliersUIContext.ids,
    };
  }, [suppliersUIContext]);

  // Suppliers Redux state
  const { suppliers } = useSelector(
    (state) => ({
      suppliers: selectedSuppliers(
        state.suppliers.entities,
        suppliersUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if suppliers weren't selected we should close modal
  useEffect(() => {
    if (!suppliersUIProps.ids || suppliersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppliersUIProps.ids]);

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
              <th>BILL</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={`id${supplier.id}`}>
                <td>{supplier.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SupplierStatusCssClasses[supplier.status]
                    } label-inline`}
                  >
                    {" "}
                    {SupplierStatusTitles[supplier.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {supplier.lastName}, {supplier.firstName}
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
