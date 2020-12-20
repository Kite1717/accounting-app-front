// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  CardBody,
} from "../../../../../../_metronic/_partials/controls";
import { Card } from "@material-ui/core";

// Validation schema
const BankEditSchema = Yup.object().shape({
  bankCaseAccountName: Yup.string()
    .min(3, "Minimum 3 karakter girilmelidir")
    .required("Kasa ismi zorunludur!!"),
});

export function CaseEditForm({ saveBank, actionsLoading, onHide }) {
  const [visibleBalance, setVisibleBalance] = useState(false);

  const intl = useIntl();
  const handleVisible = () => {
    setVisibleBalance(!visibleBalance);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          bankCaseAccountName: "",
          currencyType: "₺",
          openingDate: "",
          openingPrice: "",
          balanceStatus: "",
        }}
        validationSchema={BankEditSchema}
        onSubmit={(values) => {
          values.accountType = "1";
          saveBank(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="bankCaseAccountName"
                      component={Input}
                      placeholder="Kasa İsmi"
                      label="Kasa İsmi"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="currencyType" label="Döviz Cinsi">
                      <option value="₺">₺</option>
                      <option value="$">$</option>
                      <option value="€">€</option>
                      <option value="£">£</option>
                    </Select>
                  </div>
                </div>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Açılış Bakiyesi
                </span>
                <br />
                <span>Kasaya açılış bakiyesi ve tarih ekleyebilirsin</span>
                <br />
                {visibleBalance ? (
                  <Card style={{ borderRadius: "25px" }}>
                    <CardBody>
                      <div className="form-group">
                        {/* Gender */}
                        <div className="col-lg-4">
                          <label>Açılış Tarihi</label>
                          <br />
                          <DatePickerField name="openingDate" />
                        </div>
                        <div className="col-lg-4" style={{ marginTop: "15px" }}>
                          <Field
                            name="openingPrice"
                            type="number"
                            step="0.01"
                            component={Input}
                            placeholder="Açılış Bakiyesi"
                            label="Açılış Bakiyesi"
                          />
                        </div>
                        {/* Type */}
                        <div className="col-lg-4" style={{ marginTop: "15px" }}>
                          <Select name="balanceStatus" label="Bakiye Durumu">
                            <option value="0">Borcu Var</option>
                            <option value="1">Alacağı Var</option>
                          </Select>
                        </div>
                        <div className="col-lg-4" style={{ marginTop: "15px" }}>
                          <button
                            type="button"
                            className="btn btn-warning ml-2"
                            onClick={() => {
                              handleVisible();
                              setFieldValue("balanceStatus", "");
                              setFieldValue("openingPrice", "");
                              setFieldValue("openingDate", "");
                            }}
                          >
                            {intl.formatMessage({ id: "MENU.CANCEL" })}
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleVisible}
                  >
                    {intl.formatMessage({ id: "MENU.ADD.OPENING_PRICE" })}
                  </button>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
