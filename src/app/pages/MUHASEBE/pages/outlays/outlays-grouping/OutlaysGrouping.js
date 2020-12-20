import React, { useMemo } from "react";
import { useOutlaysUIContext } from "../OutlaysUIContext";

export function OutlaysGrouping() {
  // Outlays UI Context
  const outlaysUIContext = useOutlaysUIContext();
  const outlaysUIProps = useMemo(() => {
    return {
      ids: outlaysUIContext.ids,
      setIds: outlaysUIContext.setIds,
      openDeleteOutlaysDialog: outlaysUIContext.openDeleteOutlaysDialog,
      openFetchOutlaysDialog: outlaysUIContext.openFetchOutlaysDialog,
      openUpdateOutlaysStatusDialog:
        outlaysUIContext.openUpdateOutlaysStatusDialog,
    };
  }, [outlaysUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{outlaysUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={outlaysUIProps.openDeleteOutlaysDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={outlaysUIProps.openFetchOutlaysDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={outlaysUIProps.openUpdateOutlaysStatusDialog}
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
