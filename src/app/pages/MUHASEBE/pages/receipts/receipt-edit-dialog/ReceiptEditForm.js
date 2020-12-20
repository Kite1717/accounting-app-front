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
import { useIntl } from "react-intl";

// Validation schema
const ReceiptEditSchema = Yup.object().shape({
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

export function ReceiptEditForm({
  saveReceipt,
  receipt,
  actionsLoading,
  onHide,
}) {
  const [showDocument, setShowDocument] = React.useState(false);
  const [showStoppage, setShowStoppage] = React.useState(false);
  const [showCategory, setShowCategory] = React.useState(false);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={receipt}
        validationSchema={ReceiptEditSchema}
        onSubmit={(values) => {
          saveReceipt(values);
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
                  <div className="col-lg-12">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Müşteri Bilgisi"
                      label="Müşteri Adı"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="Makbuz Bilgisi"
                      label="Açıklama"
                    />
                  </div>
                  {/* Last Name */}
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <DatePickerField name="dateOfBbirth" label="Belge Tarihi" />
                  </div>
                  <div className="col-lg-4">
                    <Select name="Gender" label="Ödeme Planı">
                      <option value="pesin">Peşin</option>
                      <option value="vadeli">Vadeli</option>
                      <option value="taksitli">Taksitli</option>
                    </Select>
                  </div>
                </div>

                {showDocument ? (
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
                        <div className="col-lg-6">
                          <Field
                            type="text"
                            name="serial"
                            component={Input}
                            placeholder="Seri"
                            label="Seri"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            type="number"
                            name="queue"
                            component={Input}
                            placeholder="Sıra"
                            label="Sıra"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger mr-2"
                        onClick={() => {
                          setShowDocument(!showDocument);
                        }}
                      >
                        Vazgeç
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setShowDocument(!showDocument);
                        }}
                      >
                        Kaydet
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
                          setShowDocument(!showDocument);
                        }}
                      >
                        Belge Değiştir
                      </button>
                    </div>
                  </div>
                )}

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select name="Gender" label="Hesaplama Yöntemi">
                      <option value="pesin">Net Tahsilat</option>
                      <option value="vadeli">Brüt Ücret</option>
                    </Select>
                  </div>
                  <div col-lg-6>
                    <Select name="currencyType" label="Döviz Cinsi">
                      <option value="₺">₺</option>
                      <option value="$">$</option>
                      <option value="€">€</option>
                      <option value="£">£</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Select name="Gender" label="Hizmet">
                      <option value="pesin">Belge Yönetim Yazılımı</option>
                      <option value="vadeli">Özel Yazılım</option>
                    </Select>
                  </div>
                  <div className="col-lg-6">
                    <Select name="taxCode" label="Vergi">
                      <option value="0">K.D.V. %0</option>
                      <option value="1">K.D.V. %1</option>
                      <option value="18">K.D.V. %18</option>
                      <option value="8">K.D.V. %8</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">{/* BOŞŞ */}</div>
                  <div className="col-lg-4">
                    <label>Toplam KDV : 525252 TL</label>
                  </div>
                  <div className="col-lg-4">{/* BOŞŞ */}</div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Select name="stoppage" label="Stopaj">
                      <option value="0">%0 Stopaj</option>
                      <option value="1">%3 Stopaj</option>
                      <option value="18">%10 Stopaj</option>
                      <option value="8">%15 Stopaj</option>
                      <option value="8">%17 Stopaj</option>
                      <option value="8">%20 Stopaj</option>
                    </Select>
                  </div>
                </div>

                {showStoppage ? (
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
                          <Select name="tevfikat" label="Tevfikat">
                            <option value="210">2/10</option>
                            <option value="310">3/10</option>
                            <option value="510">5/10 </option>
                            <option value="810">7/10</option>
                            <option value="910">9/10</option>
                            <option value="100">1/1-TAM</option>
                          </Select>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger mr-2"
                        onClick={() => {
                          setShowStoppage(!showStoppage);
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
                          setShowStoppage(!showStoppage);
                        }}
                      >
                        Tevkifat Ekle
                      </button>
                    </div>
                  </div>
                )}

                <h2> Serbest Meslek Makbuzu Ek Bilgileri</h2>
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
