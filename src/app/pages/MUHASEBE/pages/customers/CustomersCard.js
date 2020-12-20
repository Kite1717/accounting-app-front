import React, { useMemo,useState,useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import { CustomersFilter } from "./customers-filter/CustomersFilter";
import { CustomersTable } from "./customers-table/CustomersTable";
import { CustomersGrouping } from "./customers-grouping/CustomersGrouping";
import { useCustomersUIContext } from "./CustomersUIContext";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/customers/customersActions";

export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
 // Customers Redux state
 const dispatch = useDispatch();

  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
      newSubCategoryButtonClick: customersUIContext.newSubCategoryButtonClick,
      newCategoryButtonClick: customersUIContext.newCategoryButtonClick,
      queryParams: customersUIContext.queryParams,
    };
  }, [customersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.customers }),
    shallowEqual
  );

  const {realTotalCount} = currentState;


 useEffect(() => {

   dispatch(actions.fetchCustomerRealCount());
 
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [customersUIProps.queryParams, dispatch]);


  

  const [key, setKey] = useState('tum-musteriler');

  const handleKey =(k)=>{


    if(k === "borcu-olan-musteriler")
    {

  customersUIContext.queryParams.filter.moneyStatus = "0"
  customersUIContext.queryParams.filter.tcTaxNo = null
    }
    else if(k === "borcu-olmayan-musteriler")
    {
      customersUIContext.queryParams.filter.moneyStatus = "1"
      customersUIContext.queryParams.filter.tcTaxNo = null

    }
    else{
      customersUIContext.queryParams.filter.moneyStatus = null
      customersUIContext.queryParams.filter.tcTaxNo = null
    }

    setKey(k)

  }

  
  return (
    <>
      <div className="col-lg-12" style={{ display: "flex" }}>
        <Card className="col-lg-6 mr-2 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Contact1.svg"
                )}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">Toplam Müşteri : {realTotalCount}</span>
          </CardBody>
        </Card>
        <Card className="col-lg-6 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">
              30 Gün İçinde Yapılacak Tahsilatlar : 5Tl
            </span>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Müşteri Listesi">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-warning mr-3"
              onClick={customersUIProps.newCategoryButtonClick}
            >
              Kategori Ekle
            </button>

            <button
              type="button"
              className="btn btn-info"
              onClick={customersUIProps.newSubCategoryButtonClick}
            >
              Alt Kategori Ekle
            </button>
          </CardHeaderToolbar>
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={customersUIProps.newCustomerButtonClick}
            >
              Yeni Müşteri
            </button>
          </CardHeaderToolbar>
        </CardHeader>
      </Card>

      <Tabs
        defaultActiveKey="tum-musteriler"
        transition={false}
        id="noanim-tab-example"
        onSelect={(k)=>handleKey(k)}
        activeKey={key}
        style={style1}
      >
        <Tab eventKey="tum-musteriler" title="Tüm Müşteriler" style={style2}>
          {
            key === "tum-musteriler" &&
            <Card>
            <CardBody>
              <CustomersFilter />
              {customersUIProps.ids.length > 0 && <CustomersGrouping />}
              <CustomersTable  />
            </CardBody>
          </Card>

          }
          
        </Tab>
        <Tab
          eventKey="borcu-olan-musteriler"
          title="Borcu Olan Müşteriler"
          style={style2}
        >
           {
            key === "borcu-olan-musteriler" &&
          <Card>
            <CardBody>
              <CustomersFilter />
              {customersUIProps.ids.length > 0 && <CustomersGrouping />}
              <CustomersTable status = {"0"} />
            </CardBody>
          </Card>
            }
        </Tab>
        <Tab
          eventKey="borcu-olmayan-musteriler"
          title="Borcu Olmayan Müşteriler"
          style={style2}
        >
          {
            key === "borcu-olmayan-musteriler" &&
            <Card>
            <CardBody>
              <CustomersFilter />
              {customersUIProps.ids.length > 0 && <CustomersGrouping />}
              <CustomersTable status = {"1"} />
            </CardBody>
          </Card>
          }
          
        </Tab>
      </Tabs>
    </>
  );
}

const style1 = {
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "stretch",
  margin: 0,
  padding: 0,
};

const style2 = {
  flex: 1,
  textAlign: "center",
};
