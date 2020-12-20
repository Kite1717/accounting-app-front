import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { OutgoingEBillsFilter } from "./outgoingEBills-filter/OutgoingEBillsFilter";
import { OutgoingEBillsTable } from "./outgoingEBills-table/OutgoingEBillsTable";
import { OutgoingEBillsGrouping } from "./outgoingEBills-grouping/OutgoingEBillsGrouping";
import { useOutgoingEBillsUIContext } from "./OutgoingEBillsUIContext";
import { useIntl } from "react-intl";

export function OutgoingEBillsCard() {
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      ids: outgoingEBillsUIContext.ids,
      newOutgoingEBillButtonClick: outgoingEBillsUIContext.newOutgoingEBillButtonClick,
    };
  }, [outgoingEBillsUIContext]);

  const intl = useIntl();
  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MENU.OUTGOINGEBILLS" })}>
        <CardHeaderToolbar>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={outgoingEBillsUIProps.newOutgoingEBillButtonClick}
          >

            {intl.formatMessage({ id: "MENU.OUTGOINGEBILLS.NEW_OUTGOINGEBILL" })}
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OutgoingEBillsFilter />
        {outgoingEBillsUIProps.ids.length > 0 && <OutgoingEBillsGrouping />}
        <OutgoingEBillsTable />
      </CardBody>
    </Card>
  );
}
