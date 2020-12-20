import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { WorkersFilter } from "./workers-filter/WorkersFilter";
import { WorkersTable } from "./workers-table/WorkersTable";
import { WorkersGrouping } from "./workers-grouping/WorkersGrouping";
import { useWorkersUIContext } from "./WorkersUIContext";
import { useIntl } from "react-intl";

export function WorkersCard() {
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      ids: workersUIContext.ids,
      newWorkerButtonClick: workersUIContext.newWorkerButtonClick,
    };
  }, [workersUIContext]);
  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "WORKERS.TITLE" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={workersUIProps.newWorkerButtonClick}
          >
            {intl.formatMessage({ id: "WORKERS.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <WorkersFilter />
        {workersUIProps.ids.length > 0 && <WorkersGrouping />}
        <WorkersTable />
      </CardBody>
    </Card>
  );
}
