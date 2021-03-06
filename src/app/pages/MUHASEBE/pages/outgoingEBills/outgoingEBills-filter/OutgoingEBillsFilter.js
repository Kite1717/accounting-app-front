import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";
import { useIntl } from "react-intl";

import { Button } from 'react-bootstrap'
const prepareFilter = (queryParams, values) => {
  const { tcNo } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.tcNo = tcNo !== "" ? tcNo : null


  newQueryParams.filter = filter;
  return newQueryParams;
};

export function OutgoingEBillsFilter({ listLoading }) {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      queryParams: outgoingEBillsUIContext.queryParams,
      setQueryParams: outgoingEBillsUIContext.setQueryParams,
    };
  }, [outgoingEBillsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {

    const newQueryParams = prepareFilter(outgoingEBillsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, outgoingEBillsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      outgoingEBillsUIProps.setQueryParams(newQueryParams);
    }
  };
  const intl = useIntl()

  return (
    <>
      <Formik
        initialValues={{
          tcNo: "",
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
                  <input
                    type="text"
                    className="form-control"
                    name="tcNo"
                    placeholder={intl.formatMessage({ id: "MENU.SEARCH" })}
                    onBlur={handleBlur}

                    value={values.tcNo}
                    onChange={(e) => {
                      setFieldValue("tcNo", e.target.value);

                    }}
                  />

                  <small className="form-text text-muted">
                    {intl.formatMessage({ id: "MENU.OUTGOINGEBILLS.FILTER_BY_TC_NO" })}
                  </small>
                </div>


                <div className="col-lg-1">
                  <Button onClick={handleSubmit} variant="success">{intl.formatMessage({ id: "MENU.FILTER" })}</Button>
                </div>
                <div className="col-lg-1">
                  <Button onClick={() => {
                    setFieldValue("tcNo", "")
                    handleSubmit()

                  }} variant="danger">{intl.formatMessage({ id: "MENU.CLEAN" })}</Button>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
