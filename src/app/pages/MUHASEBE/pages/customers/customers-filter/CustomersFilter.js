import React, { useMemo } from "react";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { isEqual } from "lodash";
import { useCustomersUIContext } from "../CustomersUIContext";
import { useIntl } from "react-intl";
const prepareFilter = (queryParams, values) => {
  const { tcTaxNo } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.tcTaxNo = tcTaxNo !== "" ? tcTaxNo : null;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CustomersFilter({ listLoading }) {
  const intl = useIntl();
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          tcTaxNo: "",
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
                  name="tcTaxNo"
                  placeholder="Ara"
                  onBlur={handleBlur}
                  value={values.tcTaxNo}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  Müşteri Adı, TC/Vergi No ile Ara
                </small>
              </div>

              <div className="col-lg-1">
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  variant="primary"
                >
                  {intl.formatMessage({ id: "MENU.FILTER" })}
                </Button>
              </div>

              <div className="col-lg-1">
                <Button
                  onClick={() => {
                    setFieldValue("tcTaxNo", "");
                    handleSubmit();
                  }}
                  variant="danger"
                >
                  {intl.formatMessage({ id: "MENU.CLEAN" })}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
