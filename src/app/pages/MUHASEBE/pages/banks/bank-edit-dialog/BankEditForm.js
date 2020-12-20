// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useState} from "react";
import { Modal, Alert } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  CardBody,
} from "../../../../../../_metronic/_partials/controls";
import { Card } from "@material-ui/core";
import MaskedInput from "react-text-mask";
import  Swal from 'sweetalert2'
import {useIntl} from 'react-intl'

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

export function BankEditForm({ saveBank, bank, actionsLoading, onHide }) {

  const [visibleBalance,setVisibleBalance] = useState(false)

  const intl = useIntl()
  const handleVisible = () => {
    setVisibleBalance(!visibleBalance)
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bank}
        validationSchema={BankEditSchema}
        onSubmit={(values) => {

          
        
          if(values.iban.length < 32)
          {
            Swal.fire({
              icon: 'error',
              title: 'Dikkat...',
              text: 'IBAN numarasını eksik giriyorsunuz.',
            })
            
          }
          else{
            values.accountType = "0"
            saveBank(values);
          }

        
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">

                  <div className="col-lg-4">
                    <Field
                      name="bankCaseAccountName"
                      component={Input}
                      placeholder="Banka Hesap İsmi"
                      label="Banka Hesap İsmi"
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
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="bankCode" label="Banka Kodu">
                      <option value="adabank">ADABANK A.Ş.</option>
                      <option value="akbank">AKBANK T.A.Ş.</option>
                      <option value="aktifYatirimBankasi">AKTİF YATIRIM BANKASI A.Ş.</option>
                      <option value="albarakaTurkKatilimBankasi">ALBARAKA TÜRK KATILIM BANKASI A.Ş.</option>
                      <option value="alternatifBank">ALTERNATİFBANK A.Ş.</option>
                      <option value="anadoluBank">ANADOLUBANK A.Ş.</option>
                      <option value="arapTurkBankasi">ARAP TÜRK BANKASI A.Ş.</option>
                      <option value="asyaKatilimBankasi">ASYA KATILIM BANKASI A.Ş.</option>
                      <option value="bankOfChinaTurkey">BANK OF CHİNA TURKEY A.Ş.</option>
                      <option value="bankOfTokyo">BANK OF TOKYO-MİTSUBİSHİ UFJ TURKEY A.Ş</option>
                      <option value="bankpozitifKrediVeKalkinmaBankasi">BANKPOZİTİF KREDİ VE KALKINMA BANKASI A.Ş. </option>
                      <option value="birlesikFonBankasi">BİRLEŞİK FON BANKASI A.Ş. </option>
                      <option value="burganBank">BURGAN BANK A.Ş</option>
                      <option value="citibank">CITIBANK A.Ş.</option>
                      <option value="denizbank">DENİZBANK A.Ş.</option>
                      <option value="deutscheBank"> DEUTSCHE BANK A.Ş.</option>
                      <option value="dillerYatirimBankasi">DİLLER YATIRIM BANKASI A.Ş.</option>
                      <option value="fibabanka">FİBABANKA A.Ş.</option>
                      <option value="gsdYatirimBankasi">GSD YATIRIM BANKASI A.Ş.</option>
                      <option value="hsbcBank">HSCB BANK A.Ş.</option>
                      <option value="icbcTurkeyBankasi">ICBC TURKEY BANK A.Ş.</option>
                      <option value="ingBanka">İNG BANKA A.Ş.</option>
                      <option value="ıntesaSanpaolo">INTESA SANPAOLO S.P.A</option>
                      <option value="illerBankasi">İLLER BANKASI A.Ş.</option>
                      <option value="istanbulTakas">İSTANBUL TAKAS VE SAKLAMA BANKASI A.Ş.</option>
                      <option value="jpmorganChase">JPMORGAN CHASE BANK N.A</option>
                      <option value="kuveytTurkKatilimBankasi">KUVEYT TÜRK KATILIM BANKASI A.Ş.</option>
                      <option value="merkeziKayitKurulusu">MERKEZİ KAYIT KURULUŞU A.Ş.</option>
                      <option value="merrillLynch">MERRILL LYNCH YATIRIM BANK A.Ş.</option>
                      <option value="nurolYatirimBankasi">NUROL YATIRIM BANKASI A.Ş.</option>
                      <option value="odeaBank">ODEA BANK A.Ş.</option>
                      <option value="pashaYatirimBankasi">PASHA YATIRIM BANKASI A.Ş.</option>
                      <option value="qnbFinansbank">QNB FİNANSBANK A.Ş.</option>
                      <option value="rabobank">RABOBANNK A.Ş.</option>
                      <option value="societeGenerale">SOCIETE GENERALE(SA)</option>
                      <option value="standardChartered">STANDARD CHARTERED YATIRIM BANKASI TURK A.Ş.</option>
                      <option value="sekerbank">ŞEKERBANK T.A.Ş.</option>
                      <option value="theRoyalBankOfScotland">THE ROYAL BANK OF SCOTLAND PLC.</option>
                      <option value="turkishBank">TURKISH BANK A.Ş.</option>
                      <option value="turklandBank">TURKLAND BANK A.Ş.</option>
                      <option value="turkEkonomiBankasi">TÜRK EKONOMİ BANKASI A.Ş.</option>
                      <option value="turkEximbank">TURK EXİMBANK</option>
                      <option value="tcMerkezBankasi">TÜRKİYE CUMHURİYETİ MERKEZ BANKASI</option>
                      <option value="tcZiraatBankasi">TÜRKİYE CUMHURİYETİ MERKEZ BANKASI A.Ş.</option>
                      <option value="turkiyeEmlakKatilimBankasi">TÜRKİYE EMLAK KATILIM BANKASI A.Ş.</option>
                      <option value="turkiyeFinansKatilimBankasi">TÜRKİYE FİNANNS KATILIM BANKASI A.Ş.</option>
                      <option value="turkiyeGarantiBankasi">TÜRKİYE GARANTİ BBVA BANKASI A.Ş.</option>
                      <option value="turkiyeHalkBankasi">TÜRKİYE HALK BANKASI A.Ş.</option>
                      <option value="turkiyeIsBankasi">TÜRKİYE İŞ BANKASI A.Ş.</option>
                      <option value="turkiyeKalkinmaBankasi">TÜRKİYE KALKINMA BANKASI A.Ş.</option>
                      <option value="turkiyeSinaiKalkinmaBankasi">TÜRKİYE SİNAI KALKINMA BANKASI A.Ş.</option>
                      <option value="turkiyeVakiflerBankasi">TÜRKİYE VAKIFLAR BANKASI T.A.O.</option>
                      <option value="vakifKatilimBankasi">VAKIF KATILIM BANKASI A.Ş.</option>
                      <option value="yapiVeKrediBankasi">YAPI VE KREDİ BANKASI A.Ş.</option>
                      <option value="ziraatKatilimBankasi">ZİRAAT KATILIM BANKASI A.Ş.</option>
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="text"
                      name="bankBrach"
                      component={Input}
                      placeholder="Banka Şubesi"
                      label="Banka Şubesi"
                    />
                  </div>
                </div>


                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="text"
                      name="accountNumber"
                      component={Input}
                      placeholder="Hesap Numarası"
                      label="Hesap Numarası"
                      onChange={(e) => {
                        if (/^\d+$/.test(e.target.value)) {
                          if(e.target.value.length <= 16){
                            setFieldValue("accountNumber", e.target.value)
                          }else{
                            setFieldValue("accountNumber", e.target.value.substr(0,16))
                          } 
                        }
                        else {
                          if(e.target.value.length <= 16){
                            setFieldValue("accountNumber", e.target.value.substr(0,e.target.value.length -1))
                          }
                        }

                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                  <label>IBAN Numarası</label>
                    <MaskedInput
                      type="text"
                      name="iban"
                      className="form-control"
                      placeholder="TR_ _ _ _ _ _ _"
                      guide={false}
                      mask={[
                        'T',
                        'R',
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                      ]}
                      onChange={handleChange}
                      value={values.iban}
                      onBlur={handleBlur}
                    />
                    {
                      errors.phoneNumber && touched.phoneNumber &&
                      (
                        <Alert variant="danger">{errors.phoneNumber}</Alert>
                      )
                    }
                  </div>
                  </div>
                  
                  {/* <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBbirth"
                      label="Date of Birth"
                    />
                  </div> */}
                <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="ekstre" label="Ekstre Görünümü">
                      <option value="0">Ekstrede Görünsün</option>
                      <option value="1">Ekstrede Görünmesin</option>
                    </Select>
                  </div>
                </div>

                {
                  visibleBalance ?
                    <Card style={{ borderRadius: "25px" }}>
                      <CardBody>
                        <div className="form-group">
                          {/* Gender */}
                          <div className="col-lg-4">
                            <label>Açılış Tarihi</label>
                            <br />
                            <DatePickerField
                              name="openingDate"
                            />
                          </div>
                          <div className="col-lg-4" style={{ marginTop: "15px" }}>
                            <Field
                              name="openingPrice"

                              type="number"
                              step="0.01"
                              placeholder="0.00 şeklinde giriniz"

                              component={Input}
                             
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
                              onClick={()=>{
                                
                                handleVisible()
                                setFieldValue("balanceStatus","")
                                setFieldValue("openingPrice","")
                                setFieldValue("openingDate","")

                            }}
                            >{intl.formatMessage({id: "MENU.CANCEL"})}</button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    :
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleVisible}
                    >{intl.formatMessage({id: "MENU.ADD.OPENING_PRICE"})}
                    </button>
                }

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
              {
                intl.formatMessage({id:"MENU.CANCEL"})
              }
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                 {
                intl.formatMessage({id:"MENU.SAVE"})
              }
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
