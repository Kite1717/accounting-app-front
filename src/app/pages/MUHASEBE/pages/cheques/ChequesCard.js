import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ChequesFilter } from "./cheques-filter/ChequesFilter";
import { ChequesTable } from "./cheques-table/ChequesTable";
import { ChequesGrouping } from "./cheques-grouping/ChequesGrouping";
import { useChequesUIContext } from "./ChequesUIContext";

export function ChequesCard() {
  const chequesUIContext = useChequesUIContext();
  const chequesUIProps = useMemo(() => {
    return {
      ids: chequesUIContext.ids,
      newChequeButtonClick: chequesUIContext.newChequeButtonClick,
    };
  }, [chequesUIContext]);

  return (
    <Card>
      <CardHeader title="Cheques list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={chequesUIProps.newChequeButtonClick}
          >
            New Cheque
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ChequesFilter />
        {chequesUIProps.ids.length > 0 && <ChequesGrouping />}
        <ChequesTable />
      </CardBody>
    </Card>
  );
}
