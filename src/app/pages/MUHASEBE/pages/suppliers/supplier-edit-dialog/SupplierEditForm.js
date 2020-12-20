// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/customers/customersActions";
import MaskedInput from "react-text-mask";

// Validation schema
const SupplierEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export const SupplierEditForm = ({
  saveSupplier,
  supplier,
  actionsLoading,
  onHide,
}) => {
  const dispatch = useDispatch();

  const [showBankAccount, setShowBankAccount] = React.useState(false);
  const [showAuthorized, setShowAuthorized] = React.useState(false);
  const [showCategory, setShowCategory] = React.useState(false);
  const [showOpeningPrice, setShowOpeningPrice] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.fetchCities());
    dispatch(actions.fetchTowns());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Getting curret state of customers list from store (Redux)

  const { currentState } = useSelector(
    (state) => ({ currentState: state.customers }),
    shallowEqual
  );
  const { cities, towns } = currentState;

  const [currTowns, setCurrTowns] = React.useState(null);

  const handleTowns = (e) => {
    setCurrTowns(towns.filter((item) => item.cityId === e.target.value));
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={supplier}
        validationSchema={SupplierEditSchema}
        onSubmit={(values) => {
          saveSupplier(values);
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
                  <div className="col-lg-6">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="Tedarikçi Adı"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-6">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Tedarikçi Kısa Adı"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="E-posta"
                    />
                  </div>
                  {/* Date of birth */}
                  {/*   <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBbirth"
                      label="Date of Birth"
                    />
                  </div> */}
                  {/* IP Address */}
                  <div className="col-lg-6">
                    <Field
                      name="ipAddress"
                      component={Input}
                      placeholder="IP Address"
                      label="Telefon Numarası"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="ipAddress"
                      component={Input}
                      placeholder="Adres"
                      label="Adres Satırı"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
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

                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Select name="Gender" label="Vergi Bilgileri">
                      <option value="Female">Tüzel</option>
                      <option value="Male">Gerçek</option>
                    </Select>
                  </div>
                </div>

                <h3> Banka Bilgileri</h3>
                <small className="form-text text-muted">
                  Tedarikçinin, banka hesaplarını ekle
                </small>
                <br />

                {showBankAccount ? (
                  <div
                    className="m-3"
                    style={{
                      border: "1px dashed black",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "#dddddd",
                    }}
                  >
                    <div style={{ height: "300px" }}>
                      <div className="form-group row">
                        <div className="col-lg-12">
                          <Field
                            name="accountName"
                            type="text"
                            component={Input}
                            placeholder="Hesap Adı"
                            label="Hesap Adı"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-lg-12">
                          <Field
                            name="accountNumber"
                            type="text"
                            component={Input}
                            placeholder="Hesap Numarası"
                            label="Hesap Numarası"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-lg-12">
                          <label>IBAN Numarası</label>
                          <MaskedInput
                            type="text"
                            name="iban"
                            className="form-control"
                            placeholder="TR_ _ _ _ _ _ _"
                            guide={false}
                            mask={[
                              "T",
                              "R",
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                            ]}
                            onChange={handleChange}
                            value={values.iban}
                            onBlur={handleBlur}
                          />
                          {errors.iban && touched.iban && (
                            <Alert variant="danger">{errors.iban}</Alert>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowBankAccount(!showBankAccount);
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowBankAccount(!showBankAccount);
                        }}
                      >
                        Banka Hesabı Ekle
                      </button>
                    </div>
                  </div>
                )}

                <h3> Yetkili Bilgileri</h3>
                <small className="form-text text-muted">
                  Tedarikçinin, yetkili kişilerini ekle
                </small>
                <br />

                {showAuthorized ? (
                  <div
                    className="m-3"
                    style={{
                      border: "1px dashed black",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "#dddddd",
                    }}
                  >
                    <div style={{ height: "300px" }}>
                      <div className="form-group row">
                        <div className="col-lg-12">
                          <Field
                            name="authorizedName"
                            type="text"
                            component={Input}
                            placeholder="Yetkili Adı"
                            label="Yetkili Adı"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-lg-12">
                          <Field
                            name="authorizedTel"
                            type="text"
                            component={Input}
                            placeholder="Telefon Numarası"
                            label="Telefon Numarası"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-lg-12">
                          <Field
                            name="authorizedEmail"
                            type="text"
                            component={Input}
                            placeholder="Email"
                            label="Email"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowAuthorized(!showAuthorized);
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowAuthorized(!showAuthorized);
                        }}
                      >
                        Yetkili Ekle
                      </button>
                    </div>
                  </div>
                )}

                <h2> Tedarikçi Ek Bilgileri</h2>
                <hr />
                <small className="form-text text-muted">
                  Kategori bilgisi seçerek raporlarda kategorilendirme
                  yapabilirsiniz. Yeni kategori tanımlamak için yazmanız
                  yeterlidir
                </small>
                <br />

                {showCategory ? (
                  <div
                    className="m-3"
                    style={{
                      border: "1px dashed black",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "#dddddd",
                    }}
                  >
                    <div style={{ height: "300px" }}>
                      <div className="form-group row">
                        {/* Gender */}
                        <div className="col-lg-12">
                          <Select name="Gender" label="Kategori Seçiniz">
                            <option value="Female">Alan Adı Giderleri</option>
                            <option value="Male">Aylık Giderler</option>
                            <option value="Old">Eski Müşteri</option>
                            <option value="General">Genel</option>
                          </Select>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowCategory(!showCategory);
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowCategory(!showCategory);
                        }}
                      >
                        Kategori Ekle
                      </button>
                    </div>
                  </div>
                )}

                <h3> Açılış Bakiyesi </h3>
                <small className="form-text text-muted">
                  Müşteriye açılış bakiyesi ve tarihi ekleyebilirsin
                </small>
                <br />

                {showOpeningPrice ? (
                  <div
                    className="m-3"
                    style={{
                      border: "1px dashed black",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "#dddddd",
                    }}
                  >
                    <div style={{ height: "300px" }}>
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
                        Vazgeç
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowOpeningPrice(!showOpeningPrice)}
                  >
                    Açılış Bakiyesi Ekle
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
};
