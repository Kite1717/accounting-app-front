// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";

import * as actions from "../../../_redux/products/productsActions";



// Validation schema
const ProductEditSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Zorunlu Alan"),
  sellPrice: Yup.string()
    .required("Zorunlu Alan"),
  sellPriceExchange: Yup.string()
    .required("Zorunlu Alan"),
  sellPriceKdv: Yup.string()
    .required("Zorunlu Alan"),
  buyingPrice: Yup.string()
    .required("Zorunlu Alan"),
  buyingPriceExchange: Yup.string()
    .required("Zorunlu Alan"),
  buyingPriceKdv: Yup.string()
    .required("Zorunlu Alan"),
  taxCode: Yup.string()
    .required("Zorunlu Alan"),
  unit: Yup.string()
    .required("Zorunlu Alan"),
  stockTracking: Yup.string()
    .required("Zorunlu Alan"),
});

export function ProductEditForm({
  saveProduct,
  product,
  actionsLoading,
  onHide,
}) {





  const [openStock,setOpenStock] = useState(0)
  useEffect(() => {
   
    setOpenStock(product.stockTracking)
  }, [product])



  const handleStockChange = (e) => {
    setOpenStock(e.target.value)
  }

  const dispatch = useDispatch();
  useEffect(()=>{



    dispatch(actions.fetchAvailableSuperCat());
     dispatch(actions.fetchAvailableCat());
     dispatch(actions.fetchAllSubCat());

  },[dispatch])





  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const {
    
    availableSuperCat,
    availableCat,
    allSubCat,

  
  } = currentState;


  const [currentCategories,setCurrentCategories] = useState([])
  
  const [currentSubCategories,setCurrentSubCategories] = useState([])














  useEffect(() => {
    if (availableSuperCat !== null && availableSuperCat !== undefined && availableSuperCat.length > 0) {

   
    
      setCurrentCategories(
       availableSuperCat[0].productCategories
      );
    }
  }, [availableSuperCat]);


  useEffect(() => {
    if (currentCategories !== null && currentCategories !== undefined && currentCategories.length > 0) {


      console.log(currentCategories,"xxxxxxxxxxxxxxxxxx")
   
     
    }
  }, [currentCategories]);







  const handleCategories = (e) => {
    


    setCurrentCategories(
      availableCat.filter(
        (item) => item.superCategoryId === parseInt(e.target.value)
      )
    );
  };

  const handleSubCategories = (e) => {
    

    setCurrentSubCategories(
      allSubCat.filter(
        (item) => item.categoryId === parseInt(e.target.value)
      )
    );
  };






  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
         
          if(values.stockTracking === "0")
          {
              values.stockCode = ""
              values.openingAmount = ""
              values.openingDate = ""
      
          }
          values.currentAmount = values.openingAmount;

          if(values.stockTracking === "1")
          {
            if(values.stockCode !== "" && values.openingDate !==null &&  values.openingAmount !== "")
            {
              saveProduct(values);

            }
          }
          else{
            saveProduct(values);
          }
      
        
        }}
      >
        {({ handleSubmit,handleChange,values,setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="productName"
                      component={Input}
                      placeholder="Ürün Adı"
                      label="Ürün Adı"
                    />
                    </div>
                  <br/>
                  <Row>
                  <div className="col-lg-4">
                    <Field
                      name="sellPrice"
                      component={Input}
                      placeholder="Satış Fiyatı"
                      label="Satış Fiyatı"
                    />
                    </div>
                    <div className="col-lg-4">
                    <Select name="sellPriceExchange" label="Satış Fiyatı Kuru">
                      <option value="0">₺</option>
                      <option value="1">$</option>
                      <option value="2">€</option>
                      <option value="3">£</option>
                    </Select>
                    </div>
                    <div className="col-lg-4">
                    <Select name="sellPriceKdv" label="Satış Fiyatı KDV Seçeneği">
                      <option value="0">KDV Hariç</option>
                      <option value="1">KDV Dahil</option>
                    </Select>
                    </div>
                  </Row>
                  <br/>
                  <Row>
                  <div className="col-lg-4">
                    <Field
                      name="buyingPrice"
                      component={Input}
                      placeholder="Alış Fiyatı"
                      label="Alış Fiyatı"
                    />
                    </div>
                    <div className="col-lg-4">
                    <Select name="buyingPriceExchange" label="Alış Fiyatı Kuru">
                      <option value="0">₺</option>
                      <option value="1">$</option>
                      <option value="2">€</option>
                      <option value="3">£</option>
                    </Select>
                    </div>
                    <div className="col-lg-4">
                    <Select name="buyingPriceKdv" label="Alış Fiyatı KDV Seçeneği">
                      <option value="0">KDV Hariç</option>
                      <option value="1">KDV Dahil</option>
                    </Select>
                    </div>
                  </Row>
                  <br/>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="taxCode" label="Vergi Kodu">
                      <option value="0">K.D.V. %0</option>
                      <option value="1">K.D.V. %1</option>
                      <option value="18">K.D.V. %18</option>
                      <option value="8">K.D.V. %8</option>
                    </Select>
                    </div>
                    <div className="col-lg-4">
                    <Select name="unit" label="Birim">
                      <option value="Adet">Adet</option>
                      <option value="Ay">Ay</option>
                      <option value="Çift">Çift</option>
                      <option value="Çuval">Çuval</option>
                      <option value="Dakika">Dakika</option>
                      <option value="Desilitre">Desilitre</option>
                      <option value="Desimetre">Desimetre</option>
                      <option value="File">File</option>
                      <option value="Gram">Gram</option>
                      <option value="Gün">Gün</option>
                      <option value="Hafta">Hafta</option>
                      <option value="Kamyon">Kamyon</option>
                      <option value="Kilogram">Kilogram</option>
                      <option value="Kilometre">Kilometre</option>
                      <option value="Koli">Koli</option>
                      <option value="Litre">Litre</option>
                      <option value="Metre">Metre</option>
                      <option value="Metrekare">Metrekare</option>
                      <option value="Metreküp">Metreküp</option>
                      <option value="Miligram">Miligram</option>
                      <option value="Milimetre">Milimetre</option>
                      <option value="Paket">Paket</option>
                      <option value="Palet">Palet</option>
                      <option value="Poşet">Poşet</option>
                      <option value="Saat">Saat</option>
                      <option value="Sandık">Sandık</option>
                      <option value="Saniye">Saniye</option>
                      <option value="Santimetre">Santimetre</option>
                      <option value="Ton">Ton</option>
                      <option value="Yıl">Yıl</option>
                    </Select>
                    </div>
                    <div className="col-lg-4">
                    <Select name="stockTracking" label="Stok Takibi" values = {values.stockTracking}  onChange={(e) =>{handleStockChange(e)
                       handleChange(e)}}>
                      <option value="0">Stok Takibi Yapılmasın</option>
                      <option value="1">Stok Takibi Yapılsın</option>
                    </Select>
                    </div>
                </div>

                <h3> Müşteri Ek Bilgileri </h3>
                <small className="form-text text-muted">
                  Yeni eklediğin müşteriye bir risk limiti tanımlayabilirsin
                </small>
                <br />

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="superProductCategoryId"
                      label="Üst Kategori Ekle"
                      value={values.superProductCategoryId}
                      onChange={(e) => {
                        handleChange(e);
                        handleCategories(e);
                      }}
                    >
                      {availableSuperCat &&
                        availableSuperCat.map((item, index) => {
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
                      name="productCategoryId"
                      label="Kategori Ekle"
                      value={values.productCategoryId}
                      onChange={(e) => {
                        handleChange(e);
                        handleSubCategories(e);
                      }}
                    >
                      {currentCategories &&
                        currentCategories.map((item, index) => {
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
                      name="subProductCategoryId"
                      label="Alt Kategori Ekle"
                      value={values.subProductCategoryId}
                      onChange={(e) => {
                        handleChange(e);
                        handleCategories(e);
                      }}
                    >
                      {currentSubCategories &&
                        currentSubCategories.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                
                </div>





                {
                  openStock === "1" && 
                  <>
                    <div className="col-lg-4">
                    <Field
                      name="stockCode"
                      component={Input}
                      placeholder="Stok Kodu"
                      label="Stok Kodu"
                    />
                    </div>
                    <div className="col-lg-4">
                    <Field
                      name="openingAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00 şeklinde giriniz"
                      component={Input}
                    
                      label="Açılış Miktarı"
                    />
                    </div>
                    <div className="col-lg-4">
                    <label>Açılış Tarihi</label>
                    <DatePicker 

                     name = "openingDate" 
                     dateFormat = "dd-MM-yyyy" 
                     selected={Date.parse(values.openingDate)} 
                     onChange={date => setFieldValue("openingDate",date)} />
                 
                    </div>
                    </>
                }
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                İptal
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Kaydet
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
