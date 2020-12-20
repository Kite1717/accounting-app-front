import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ReceiptsFilter } from "./receipts-filter/ReceiptsFilter";
import { ReceiptsTable } from "./receipts-table/ReceiptsTable";
import { ReceiptsGrouping } from "./receipts-grouping/ReceiptsGrouping";
import { useReceiptsUIContext } from "./ReceiptsUIContext";
import { useIntl } from "react-intl";

export function ReceiptsCard() {
  const receiptsUIContext = useReceiptsUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      newReceiptButtonClick: receiptsUIContext.newReceiptButtonClick,
    };
  }, [receiptsUIContext]);

  const intl = useIntl();
  return (
    <>
      <Card>
        <CardHeader title={intl.formatMessage({ id: "RECEIPTS.TITLE" })}>
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={receiptsUIProps.newReceiptButtonClick}
            >
              {intl.formatMessage({ id: "RECEIPTS.NEW" })}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ReceiptsFilter />
          {receiptsUIProps.ids.length > 0 && <ReceiptsGrouping />}
          <ReceiptsTable />
        </CardBody>
      </Card>
    </>
  );
}
