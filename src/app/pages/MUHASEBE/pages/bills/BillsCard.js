import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import { BillsFilter } from "./bills-filter/BillsFilter";
import { BillsTable } from "./bills-table/BillsTable";
import { BillsGrouping } from "./bills-grouping/BillsGrouping";
import { useBillsUIContext } from "./BillsUIContext";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import {
  Tabs,
  Tab,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

export function BillsCard() {
  const billsUIContext = useBillsUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      newBillButtonClick: billsUIContext.newBillButtonClick,
    };
  }, [billsUIContext]);

  return (
    <>
      <Card style={{ backgroundColor: "red", color: "white" }}>
        <CardHeader>
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Code/Warning-1-circle.svg"
                )}
              />
            </span>
            9 tane toplam 67.279,96 ₺ tutarında vadesi geçen ve tahsil
            edilemeyen belgeler var!
          </CardBody>

          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-light text-danger"
              onClick={() => console.log("clicked")}
            >
              Faturalar
            </button>
          </CardHeaderToolbar>
        </CardHeader>
      </Card>

      <div className="col-lg-12" style={{ display: "flex" }}>
        <Card className="col-lg-6 mr-2 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}
                style={{
                  width: "75px",
                  height: "75px",
                  color: "green",
                }}
              />
            </span>
            <span className="col-lg-3">Fatura Toplamı : 5Tl</span>
          </CardBody>
        </Card>
        <Card className="col-lg-6 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-3">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Mail-opened.svg"
                )}
                style={{
                  width: "75px",
                  height: "75px",
                }}
              />
            </span>
            <span className="col-lg-3">Proforma Toplamı : 5Tl</span>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Fatura Listesi">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={billsUIProps.newBillButtonClick}
            >
              Yeni Fatura
            </button>

            <ButtonGroup vertical>
              <DropdownButton
                as={ButtonGroup}
                title="Diğer"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item eventKey="1">Proforma Fatura Ekle</Dropdown.Item>
                <Dropdown.Item eventKey="2">Parekende Fatura Ekle</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </CardHeaderToolbar>
        </CardHeader>
      </Card>

      <Tabs
        defaultActiveKey="tum-faturalar"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="tum-faturalar" title="Tüm Faturalar">
          <Card>
            <CardBody>
              <BillsFilter />
              {billsUIProps.ids.length > 0 && <BillsGrouping />}
              <BillsTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey="tahsil-edilmemis" title="Tahsil Edilmemiş">
          <Card>
            <CardBody>
              <BillsFilter />
              {billsUIProps.ids.length > 0 && <BillsGrouping />}
              <BillsTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey="proforma" title="Proforma">
          <Card>
            <CardBody>
              <BillsFilter />
              {billsUIProps.ids.length > 0 && <BillsGrouping />}
              <BillsTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey="tahsil-edilmis" title="Tahsil Edilmiş">
          <Card>
            <CardBody>
              <BillsFilter />
              {billsUIProps.ids.length > 0 && <BillsGrouping />}
              <BillsTable />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
