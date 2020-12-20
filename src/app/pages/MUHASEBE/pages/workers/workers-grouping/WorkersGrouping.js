import React, { useMemo } from "react";
import { useWorkersUIContext } from "../WorkersUIContext";

export function WorkersGrouping() {
  // Workers UI Context
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      ids: workersUIContext.ids,
      setIds: workersUIContext.setIds,
      openDeleteWorkersDialog: workersUIContext.openDeleteWorkersDialog,
      openFetchWorkersDialog: workersUIContext.openFetchWorkersDialog,
      openUpdateWorkersStatusDialog:
        workersUIContext.openUpdateWorkersStatusDialog,
    };
  }, [workersUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{workersUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={workersUIProps.openDeleteWorkersDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={workersUIProps.openFetchWorkersDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={workersUIProps.openUpdateWorkersStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
