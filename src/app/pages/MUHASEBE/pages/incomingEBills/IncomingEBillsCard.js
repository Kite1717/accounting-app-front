import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { IncomingEBillsFilter } from "./incomingEBills-filter/IncomingEBillsFilter";
import { IncomingEBillsTable } from "./incomingEBills-table/IncomingEBillsTable";
import { IncomingEBillsGrouping } from "./incomingEBills-grouping/IncomingEBillsGrouping";
import { useIncomingEBillsUIContext } from "./IncomingEBillsUIContext";
import { useIntl } from "react-intl";

export function IncomingEBillsCard() {
  const incomingEBillsUIContext = useIncomingEBillsUIContext();
  const incomingEBillsUIProps = useMemo(() => {
    return {
      ids: incomingEBillsUIContext.ids,
      newIncomingEBillButtonClick: incomingEBillsUIContext.newIncomingEBillButtonClick,
    };
  }, [incomingEBillsUIContext]);

  const intl = useIntl();
  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MENU.INCOMINGEBILLS" })}>
        <CardHeaderToolbar>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={incomingEBillsUIProps.newIncomingEBillButtonClick}
          >

            {intl.formatMessage({ id: "MENU.INCOMINGEBILLS.NEW_INCOMINGEBILL" })}
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IncomingEBillsFilter />
        {incomingEBillsUIProps.ids.length > 0 && <IncomingEBillsGrouping />}
        <IncomingEBillsTable />
      </CardBody>
    </Card>
  );
}
