// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const OutlayDocumentEditSchema = Yup.object().shape({
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

export function OutlayDocumentEditForm({
  saveOutlayDocument,
  outlayDocument,
  actionsLoading,
  onHide,
}) {
  const [showCategory, setShowCategory] = React.useState(false);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={outlayDocument}
        validationSchema={OutlayDocumentEditSchema}
        onSubmit={(values) => {
          saveOutlayDocument(values);
        }}
      >
        {({ handleSubmit }) => (
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
                    <Select name="Gender" label="Gider Kategorileri">
                      <option value="Female">Araç Kiralama</option>
                      <option value="Male">Bilet</option>
                      <option value="Female">Diğer</option>
                      <option value="Male">Elektrik Faturası</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-5">
                    <label>Belge Tarihi</label>
                    <br />
                    <DatePickerField name="dateOfBbirth" />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="userName"
                      component={Input}
                      placeholder="Belge Numarası"
                      label="Belge Numarası"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="number"
                      name="total"
                      component={Input}
                      placeholder="Tutar"
                      label="Tutar"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="buyingPriceKdv"
                      label="Alış Fiyatı KDV Seçeneği"
                    >
                      <option value="0">KDV Hariç</option>
                      <option value="1">KDV Dahil</option>
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="taxCode" label="Vergi">
                      <option value="0">K.D.V. %0</option>
                      <option value="1">K.D.V. %1</option>
                      <option value="18">K.D.V. %18</option>
                      <option value="8">K.D.V. %8</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Toplam KDV: 0,00</label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Toplam Tutar: 0,00</label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select name="buyingPriceKdv" label="Ödeme Bilgileri">
                      <option value="0">Ödenecek</option>
                      <option value="1">Ödendi</option>
                      <option value="2">Çalışan Cebinden Ödedi</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBbirth"
                      label="Ödenecek Tarih"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select name="supplier" label="Tedarikçi">
                      <option value="aa">Ahmet</option>
                      <option value="bb">Mahmet</option>
                      <option value="cc">Mahmut</option>
                    </Select>
                  </div>
                </div>

                <h2> Fiş Ek Bilgileri</h2>
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

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select name="workers" label="Harcamayı Yapan Çalışan">
                      <option value="aa">Ahmet</option>
                      <option value="bb">Mahmet</option>
                      <option value="cc">Mahmut</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      type="text"
                      name="Description"
                      component={Input}
                      placeholder="Açıklama"
                      label="Açıklama"
                    />
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
