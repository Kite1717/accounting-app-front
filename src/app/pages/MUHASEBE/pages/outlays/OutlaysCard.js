import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { OutlaysFilter } from "./outlays-filter/OutlaysFilter";
import { OutlaysTable } from "./outlays-table/OutlaysTable";
import { OutlaysGrouping } from "./outlays-grouping/OutlaysGrouping";
import { useOutlaysUIContext } from "./OutlaysUIContext";

export function OutlaysCard() {
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      ids: outlaysUIContext.ids,
      newOutlayButtonClick: outlaysUIContext.newOutlayButtonClick,
    };
  }, [outlaysUIContext]);

  return (
    <Card>
      <CardHeader title="Outlays list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={outlaysUIProps.newOutlayButtonClick}
          >
            New Outlay
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OutlaysFilter />
        {outlaysUIProps.ids.length > 0 && <OutlaysGrouping />}
        <OutlaysTable />
      </CardBody>
    </Card>
  );
}
