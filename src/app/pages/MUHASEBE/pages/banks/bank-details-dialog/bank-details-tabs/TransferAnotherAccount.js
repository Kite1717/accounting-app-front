// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField,
    CardBody,
} from "../../../../../../../_metronic/_partials/controls";
import { Card } from "@material-ui/core";
import MaskedInput from "react-text-mask";
import Swal from 'sweetalert2'
import { useIntl } from 'react-intl'

// Validation schema
const BankEditSchema = Yup.object().shape({
    bankCaseAccountName: Yup.string()
        .min(3, "Minimum 3 karakter")
        .required("Gereklidir"),
    bankCode: Yup.string()
        .min(3, "Minimum 3 karakter")
        .required("Gereklidir"),
    bankBrach: Yup.string()
        .min(3, "Minimum 3 karakter")
        .required("Gereklidir"),

    accountNumber: Yup.string()
        .min(16, "Minimum 16 karakter")
        .max(16, "Maksimum 16 karakter")
        .required("Gereklidir"),


});

export function TransferAnotherAccount({ onHide }) {

    const intl = useIntl();
    const initValues = {
        date: new Date(),
        amount: null,
        description: "",
    }

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initValues}
                validationSchema={BankEditSchema}
                onSubmit={(values) => {
                    //   if(values.iban.length < 32)
                    //   {
                    //     Swal.fire({
                    //       icon: 'error',
                    //       title: 'Dikkat...',
                    //       text: 'IBAN numarasını eksik giriyorsunuz.',
                    //     })
                    //   }
                    //   else{
                    //     values.accountType = "0"
                    //     // saveBank(values);
                    //   }
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
                    <>

                        {/* {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )} */}
                        <Form className="form form-label-right mt-6">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Select
                                        name="accountName"
                                        label="Diğer Hesap"
                                    >
                                        <option value="örneekkk"> Örnek ama Statik veri</option>
                                        <option value="örneeqwkkk"> Örnek ama Statik veri2</option>
                                    </Select>


                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label>
                                        Tarih
                      </label>
                                    <DatePickerField
                                        name="date"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        type="number"
                                        name="amount"
                                        component={Input}
                                        placeholder="Tutar"
                                        label="Tutar"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        type="text"
                                        name="description"
                                        component={Input}
                                        placeholder="Açıklama"
                                        label="Açıklama"
                                    />
                                </div>
                            </div>
                        </Form>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                {
                                    intl.formatMessage({ id: "MENU.CANCEL" })
                                }
                            </button>
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                {
                                    intl.formatMessage({ id: "MENU.SAVE" })
                                }
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
