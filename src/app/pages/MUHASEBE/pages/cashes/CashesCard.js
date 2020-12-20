import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CashesFilter } from "./cashes-filter/CashesFilter";
import { CashesTable } from "./cashes-table/CashesTable";
import { CashesGrouping } from "./cashes-grouping/CashesGrouping";
import { useCashesUIContext } from "./CashesUIContext";

export function CashesCard() {
  const cashesUIContext = useCashesUIContext();
  const cashesUIProps = useMemo(() => {
    return {
      ids: cashesUIContext.ids,
      newCashButtonClick: cashesUIContext.newCashButtonClick,
    };
  }, [cashesUIContext]);

  return (
    <Card>
      <CardHeader title="Cashes list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={cashesUIProps.newCashButtonClick}
          >
            New Cash
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CashesFilter />
        {cashesUIProps.ids.length > 0 && <CashesGrouping />}
        <CashesTable />
      </CardBody>
    </Card>
  );
}
