import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "../../../../../_metronic/_partials/controls";
import Chart from "react-apexcharts";
import { Tabs, Tab } from "react-bootstrap";
import "./_OutlayReportsPage.scss";

import { Bills } from "./Bills";
import { Customers } from "./Customers";
import { Products } from "./Products";

export const OutlayReportsPage = () => {
  let options1 = {
    options: {
      chart: {
        id: "donut",
      },
    },
    series: [44, 55, 13, 33],
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
  };

  let options2 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <>
      <Card>
        <CardHeader title="Kategori Dağılımları"></CardHeader>
        <CardBody className="col-lg-12 main-container">
          <Card className="shadow mr-2">
            <CardHeader title="Fatura Kategorileri"></CardHeader>
            <CardBody>
              <Chart
                options={options1.options}
                series={options1.series}
                type="donut"
                width="100%"
              />
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="shadow mr-2">
            <CardHeader title="Müşteri Kategorileri"></CardHeader>
            <CardBody>
              <Chart
                options={options1.options}
                series={options1.series}
                type="donut"
                width="100%"
              />
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="shadow">
            <CardHeader title="Ürün Kategorileri"></CardHeader>
            <CardBody>
              <Chart
                options={options1.options}
                series={options1.series}
                type="donut"
                width="100%"
              />
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </CardBody>

        {/**************************************************************************************************/}
        {/**************************************** SATIS DAGILIMLARI ***************************************/}

        <Card>
          <CardHeader title="Satış Dağılımları"></CardHeader>
          <CardBody className="sales-shadow mt-2">
            <Chart
              options={options2.options}
              series={options2.series}
              type="bar"
            />
          </CardBody>
        </Card>

        {/**************************************************************************************************/}
        {/**************************************** TABLOLAR ************************************************/}

        <Tabs defaultActiveKey="faturalar" id="uncontrolled-tab-example">
          <Tab eventKey="faturalar" title="Faturalar">
            <Bills />
          </Tab>
          <Tab eventKey="musteriler" title="Müşteriler">
            <Customers />
          </Tab>
          <Tab eventKey="hizmet-urunler" title="Hizmet/Ürünler">
            <Products />
          </Tab>
        </Tabs>
      </Card>
    </>
  );
};
