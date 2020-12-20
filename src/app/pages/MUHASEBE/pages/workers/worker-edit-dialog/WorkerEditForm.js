// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import MaskedInput from "react-text-mask";
import { useIntl } from "react-intl";

// Validation schema
const WorkerEditSchema = Yup.object().shape({
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

export function WorkerEditForm({ saveWorker, worker, actionsLoading, onHide }) {
  const [showCategory, setShowCategory] = React.useState(false);
  const [showOpeningPrice, setShowOpeningPrice] = React.useState(false);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={worker}
        validationSchema={WorkerEditSchema}
        onSubmit={(values) => {
          saveWorker(values);
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
                  <div className="col-lg-12">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="Adı"
                      label="Adı"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBegin"
                      label="İşe Giriş Tarihi"
                    />
                  </div>

                  <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfEnd"
                      label="İşten Çıkış Tarihi"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="email"
                      type="email"
                      component={Input}
                      placeholder="E-posta"
                      label="E-posta"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="tel"
                      type="number"
                      component={Input}
                      placeholder="Telefon Numarası"
                      label="Telefon Numarası"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="Adı"
                      label="Adı"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="TcNo"
                      component={Input}
                      placeholder="T.C. Kimlik No/Vergi Kimlik No"
                      label="T.C. Kimlik No/Vergi Kimlik No"
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
                        <div className="col-lg-4">
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

                        <div className="col-lg-4">
                          <Select name="moneyStatus" label="Bakiye Durumu">
                            <option value="0">Borcu var</option>
                            <option value="1">Alacağı var</option>
                          </Select>
                        </div>

                        <div className="col-lg-4">
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
                        className="btn btn-danger"
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
                    className="btn btn-primary mb-1"
                    onClick={() => setShowOpeningPrice(!showOpeningPrice)}
                  >
                    Açılış Bakiyesi Ekle
                  </button>
                )}

                <h3> Çalışan Ek Bilgileri</h3>
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
                        className="btn btn-danger"
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
