import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import { OutlayDocumentsFilter } from "./outlay-documents-filter/OutlayDocumentsFilter";
import { OutlayDocumentsTable } from "./outlay-documents-table/OutlayDocumentsTable";
import { OutlayDocumentsGrouping } from "./outlay-documents-grouping/OutlayDocumentsGrouping";
import { useOutlayDocumentsUIContext } from "./OutlayDocumentsUIContext";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { useIntl } from "react-intl";

export function OutlayDocumentsCard() {
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      ids: outlayDocumentsUIContext.ids,
      newOutlayDocumentButtonClick:
        outlayDocumentsUIContext.newOutlayDocumentButtonClick,
    };
  }, [outlayDocumentsUIContext]);

  const intl = useIntl();

  return (
    <>
      <div className="col-lg-12" style={{ display: "flex" }}>
        <Card className="col-lg-6 mr-2 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">
              Giderler Toplamı : <strong>5000TL</strong>
            </span>
          </CardBody>
        </Card>
        <Card className="col-lg-6 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">
              Bu Ayki Giderler Toplamı : <strong>5000TL</strong>
            </span>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader
          title={intl.formatMessage({ id: "OUTLAY.DOCUMENTS.TITLE" })}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={outlayDocumentsUIProps.newOutlayDocumentButtonClick}
            >
              {intl.formatMessage({ id: "OUTLAY.DOCUMENTS.NEW" })}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <OutlayDocumentsFilter />
          {outlayDocumentsUIProps.ids.length > 0 && <OutlayDocumentsGrouping />}
          <OutlayDocumentsTable />
        </CardBody>
      </Card>
    </>
  );
}
