import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import { SuppliersFilter } from "./suppliers-filter/SuppliersFilter";
import { SuppliersTable } from "./suppliers-table/SuppliersTable";
import { SuppliersGrouping } from "./suppliers-grouping/SuppliersGrouping";
import { useSuppliersUIContext } from "./SuppliersUIContext";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { useIntl } from "react-intl";

export function SuppliersCard() {
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      ids: suppliersUIContext.ids,
      newSupplierButtonClick: suppliersUIContext.newSupplierButtonClick,
    };
  }, [suppliersUIContext]);

  const intl = useIntl();

  return (
    <>
      <div className="col-lg-12" style={{ display: "flex" }}>
        <Card className="col-lg-6 mr-2 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Contact1.svg"
                )}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">
              Toplam Tedarikçi : <strong>50</strong>
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
              30 Gün İçinde Yapılacak Ödemeler : <strong>5000TL</strong>
            </span>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title={intl.formatMessage({ id: "SUPPLIER.TITLE" })}>
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={suppliersUIProps.newSupplierButtonClick}
            >
              {intl.formatMessage({ id: "SUPPLIER.NEW" })}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
      </Card>
      <Tabs
        defaultActiveKey="tum-tedarikciler"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="tum-tedarikciler" title="Tüm Tedarikçiler">
          <Card>
            <CardBody>
              <SuppliersFilter />
              {suppliersUIProps.ids.length > 0 && <SuppliersGrouping />}
              <SuppliersTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          eventKey="alacagi-olan-tedarikciler"
          title="Alacağı Olan Tedarikçiler"
        >
          <Card>
            <CardBody>
              <SuppliersFilter />
              {suppliersUIProps.ids.length > 0 && <SuppliersGrouping />}
              <SuppliersTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          eventKey="alacagi-olmayan-tedarikciler"
          title="Alacağı Olmayan Tedarikçiler"
        >
          <Card>
            <CardBody>
              <SuppliersFilter />
              {suppliersUIProps.ids.length > 0 && <SuppliersGrouping />}
              <SuppliersTable />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
