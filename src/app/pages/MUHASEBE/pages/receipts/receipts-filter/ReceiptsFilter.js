import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useReceiptsUIContext } from "../ReceiptsUIContext";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.lastName = searchText;
  if (searchText) {
    filter.firstName = searchText;
    filter.email = searchText;
    filter.ipAddress = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ReceiptsFilter({ listLoading }) {
  // Receipts UI Context
  const receiptsUIContext = useReceiptsUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      queryParams: receiptsUIContext.queryParams,
      setQueryParams: receiptsUIContext.setQueryParams,
    };
  }, [receiptsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(receiptsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, receiptsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      receiptsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();
  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
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
                  {intl.formatMessage({ id: "MENU.RECEIPTS.FILTER" })}
                </small>
              </div>

              <div className="col-lg-1">
                <Button onClick={handleSubmit} variant="success">
                  {intl.formatMessage({ id: "MENU.FILTER" })}
                </Button>
              </div>
              <div className="col-lg-1">
                <Button
                  onClick={() => {
                    setFieldValue("tcNo", "");
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
