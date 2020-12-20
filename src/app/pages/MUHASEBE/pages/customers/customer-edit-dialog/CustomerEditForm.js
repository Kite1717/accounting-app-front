// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

import {
  Input,
  Select,
  CardBody,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import MaskedInput from "react-text-mask";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/customers/customersActions";

import { Card } from "@material-ui/core";

// Validation schema
// const CustomerEditSchema = Yup.object().shape({
//   fullName: Yup.string()
//     .min(2, "Minimum 2 karakter giriniz")
//     .required("Bu Alan Boş Bırakılamaz"),
//   phoneNumber: Yup.string()
//     .min(14, "Minimum 10 karakter giriniz")
//     .required("Bu Alan Boş Bırakılamaz"),
//   tcNo: Yup.string()
//     .min(10, "Tc Numarası/Vergi No 10-11 karakterden oluşur").max(11, "Tc Numarası/Vergi No 10-11 karakterden oluşur")
//     .required("Bu Alan Boş Bırakılamaz")
// });

export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchCities());
    dispatch(actions.fetchTowns());
    dispatch(actions.fetchUsers());
    dispatch(actions.fetchCategoriesHaveSub());
    dispatch(actions.fetchSubCategories());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.customers }),
    shallowEqual
  );
  const {
    cities,
    towns,
    users,
    haveCategoriesOfSub,
    subCategories,
  } = currentState;

  const [currTowns, setCurrTowns] = useState(null);
  const [currSubCategories, setCurrSubCategories] = useState(null);

  useEffect(() => {
    if (towns !== null && towns !== undefined) {
      setCurrTowns(towns.filter((item) => item.cityId === customer.cityId));
    }
  }, [customer.cityId, towns]);

  useEffect(() => {
    if (subCategories !== null && subCategories !== undefined) {
      setCurrSubCategories(
        subCategories.filter(
          (item) => item.categoryId === parseInt(customer.customerCategoryId)
        )
      );
    }
  }, [customer.customerCategoryId, subCategories]);

  const handleTowns = (e) => {
    setCurrTowns(towns.filter((item) => item.cityId === e.target.value));
  };

  const handleSubCategories = (e) => {
    setCurrSubCategories(
      subCategories.filter(
        (item) => item.categoryId === parseInt(e.target.value)
      )
    );
  };

  const [show, setShow] = useState(true);

  // Customers Redux state
  const intl = useIntl();
  const [showCustomerLimit, setShowCustomerLimit] = useState(false);
  const [showOpeningPrice, setShowOpeningPrice] = useState(false);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        //   validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          console.log(values, "xxxxxxxxxxxx");
          saveCustomer(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
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
                      name="fullName"
                      component={Input}
                      placeholder="Adı yada firma Adı"
                      label="Müşteri Ad Soyad"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="shortName"
                      component={Input}
                      placeholder="Müşteriyi kolayca bul!"
                      label="Müşteri Kısa Ad"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <label>Telefon Numarası</label>
                    <MaskedInput
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="(___) _ __"
                      guide={false}
                      mask={[
                        "(",
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Alert variant="danger">{errors.phoneNumber}</Alert>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="cityId"
                      label="Şehir"
                      value={values.cityId}
                      onChange={(e) => {
                        handleChange(e);
                        handleTowns(e);
                      }}
                    >
                      {cities &&
                        cities.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="townId" label="İlçe">
                      {currTowns &&
                        currTowns.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>

                  <div className="col-lg-4">
                    <Field
                      name="tcTaxNo"
                      component={Input}
                      placeholder="TC Kimlik No/Vergi Kimlik No"
                      label="TC Kimlik No/Vergi Kimlik No"
                      onChange={(e) => {
                        if (/^\d+$/.test(e.target.value)) {
                          if (e.target.value.length <= 11) {
                            setFieldValue("tcTaxNo", e.target.value);
                          } else {
                            setFieldValue(
                              "tcTaxNo",
                              e.target.value.substr(0, 11)
                            );
                          }
                        } else {
                          if (e.target.value.length <= 11) {
                            setFieldValue(
                              "tcTaxNo",
                              e.target.value.substr(
                                0,
                                e.target.value.length - 1
                              )
                            );
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-8">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Adres"
                      label="Adres"
                    />
                  </div>
                </div>

                <h3> Vergi Bilgileri </h3>
                <small className="form-text text-muted">
                  Müşterilerine fatura kesebilmek için aşağıdaki bilgileri
                  girmen gerek.
                </small>
                <br />

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="customerStatus"
                      value={values.customerStatus}
                      onChange={(e) => {
                        handleChange(e);
                        setShow(!Boolean(Number(e.target.value)));
                      }}
                      label="Durumu"
                    >
                      <option value="0">Tüzel</option>
                      <option value="1">Gerçek</option>
                    </Select>
                    <small className="form-text text-muted">
                      A.Ş, LTD, şahıs şirketleri için Tüzel Seçilmelidir
                    </small>
                  </div>

                  {show && (
                    <div className="col-lg-4">
                      <Field
                        name="taxAdministration"
                        component={Input}
                        label="Vergi Dairesi"
                        placeholder="Vergi Dairesi"
                      />
                    </div>
                  )}
                </div>

                <h3> Müşteri Limiti </h3>
                <small className="form-text text-muted">
                  Yeni eklediğin müşteriye bir risk limiti tanımlayabilirsin
                </small>
                <br />
                {showCustomerLimit ? (
                  <Card>
                    <CardBody>
                      <div className="form-group row">
                        <div className="col-lg-4">
                          <Field
                            type="number"
                            step="0.01"
                            placeholder="0.00 şeklinde giriniz"
                            name="customerLimit"
                            component={Input}
                            label="Müşteri Limiti"
                          />
                          <small className="form-text text-muted">
                            Müşterinin borç bakiyesi bu limiti aştığında fatura
                            kesemeyeceksiniz. Limiti dövizli veriyorsanız güncel
                            kurdan hesaplar..
                          </small>
                        </div>
                        <div className="col-lg-4">
                          <Select name="customerLimitExchange" label="Birim">
                            <option value="0">₺</option>
                            <option value="1">$</option>
                            <option value="2">€</option>
                            <option value="3">£</option>
                          </Select>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowCustomerLimit(!showCustomerLimit);
                        }}
                      >
                        İptal
                      </button>
                    </CardBody>
                  </Card>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowCustomerLimit(!showCustomerLimit)}
                  >
                    Müşteri Limiti Ekle
                  </button>
                )}

                <h3> Müşteri Ek Bilgileri </h3>
                <small className="form-text text-muted">
                  Yeni eklediğin müşteriye bir risk limiti tanımlayabilirsin
                </small>
                <br />

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="customerCategoryId"
                      label="Kategori Ekle"
                      value={values.customerCategoryId}
                      onChange={(e) => {
                        handleChange(e);
                        handleSubCategories(e);
                      }}
                    >
                      {haveCategoriesOfSub &&
                        haveCategoriesOfSub.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="customerSubCategoryId"
                      label="AltKategori Ekle"
                    >
                      {currSubCategories &&
                        currSubCategories.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                </div>

                <h3> Açılış Bakiyesi </h3>
                <small className="form-text text-muted">
                  Müşteriye açılış bakiyesi ve tarihi ekleyebilirsin
                </small>
                <br />
                {showOpeningPrice ? (
                  <Card>
                    <CardBody style={{ height: "300px" }}>
                      <div className="form-group row">
                        <div className="col-lg-3">
                          <Field
                            name="openingPrice"
                            type="number"
                            step="0.01"
                            component={Input}
                            placeholder="0.00 şeklinde giriniz"
                            label="Müşteri Limiti"
                          />
                        </div>
                        <div className="col-lg-3">
                          <label>Açılış Tarihi</label>
                          <DatePickerField
                            name="openingDate"
                            dateFormat="dd-MM-yyyy"
                            selected={Date.parse(values.openingDate)}
                            onChange={(date) =>
                              setFieldValue("openingDate", date)
                            }
                          />
                        </div>

                        <div className="col-lg-3">
                          <Select name="moneyStatus" label="Bakiye Durumu">
                            <option value="0">Borcu var</option>
                            <option value="1">Alacağı var</option>
                          </Select>
                        </div>

                        <div className="col-lg-3">
                          <label>Vade Tarihi</label>
                          <DatePickerField
                            name="maturityDate"
                            dateFormat="dd-MM-yyyy"
                            selected={Date.parse(values.maturityDate)}
                            onChange={(date) =>
                              setFieldValue("maturityDate", date)
                            }
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowOpeningPrice(!showOpeningPrice);
                        }}
                      >
                        İptal
                      </button>
                    </CardBody>
                  </Card>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowOpeningPrice(!showOpeningPrice)}
                  >
                    Açılış Bakiyesi Ekle
                  </button>
                )}

                <h3> Plasiyer</h3>
                <small className="form-text text-muted">
                  Müşteriye plasiyer atıyabilirsin.
                </small>
                <br />

                <div className="form-group row">
                  <div className="col-lg-3">
                    <Select name="customerRepresentativeId">
                      {users &&
                        users.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.fullName}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {intl.formatMessage({ id: "MENU.CANCEL" })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {intl.formatMessage({ id: "MENU.SAVE" })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
