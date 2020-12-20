import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useBanksUIContext } from "../BanksUIContext";
import{useIntl} from 'react-intl'
import {Button} from 'react-bootstrap'
const prepareFilter = (queryParams, values) => {

  
  const {accountType,bankCaseAccountName } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  // Filter by type
  filter.accountType = accountType !== "" ? Number(accountType) : null;
  filter.bankCaseAccountName = bankCaseAccountName !== "" ? bankCaseAccountName : null;


  newQueryParams.filter = filter;
  return newQueryParams;
};

export function BanksFilter({ listLoading }) {


  const intl = useIntl()

  // Banks UI Context
  const banksUIContext = useBanksUIContext();
  const banksUIProps = useMemo(() => {
    return {
      queryParams: banksUIContext.queryParams,
      setQueryParams: banksUIContext.setQueryParams,
    };
  }, [banksUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(banksUIProps.queryParams, values);
    if (!isEqual(newQueryParams, banksUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      banksUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          accountType: "", // values => All=""/Susspended=0/Active=1/Pending=2
          bankCaseAccountName: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="accountType"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accountType}
                >
                  <option value="">{intl.formatMessage({id: "MENU.ALL"})}</option>
                  <option value="0">{intl.formatMessage({id: "MENU.BANK"})}</option>
                  <option value="1">{intl.formatMessage({id: "MENU.CASE"})}</option>
                
                </select>
                <small className="form-text text-muted">
             {intl.formatMessage({id: "MENU.BANKS_CASES_FILTER_MSG"})}    
                </small>
              </div>
             
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="bankCaseAccountName"
                  onBlur={handleBlur}
                  value={values.bankCaseAccountName}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                {intl.formatMessage({id: "MENU.BANKS_CASES_FILTER_INPUT_MSG"})}
                </small>
              </div>


              <div className="col-lg-1">
              <Button onClick={handleSubmit} variant = "primary">{intl.formatMessage({id : "MENU.FILTER"})}</Button>
              </div>
              <div className="col-lg-1">
                <Button onClick={()=>{
                  setFieldValue("bankCaseAccountName","")
                  setFieldValue("accountType","")
                  handleSubmit()
                }} variant = "danger">{intl.formatMessage({id : "MENU.CLEAN"})}</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
