import React from "react";
import SVG from "react-inlinesvg";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import Chart from "react-apexcharts";

import { PaymentList } from "./PaymentList";

export const PaymentReportsPage = () => {
  let options1 = {
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
        <CardHeader title="Ödemeler Raporu"></CardHeader>
        <CardBody>
          <div className="col-lg-12" style={{ display: "flex" }}>
            <Card className="col-lg-4 mr-2 shadow">
              <CardBody>
                <span className="svg-icon menu-icon col-lg-2">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                    style={{
                      width: "50px",
                      height: "50px",
                      color: "green",
                    }}
                  />
                </span>
                <span className="col-lg-2">Vadesi Geçen Ödemeler : 5Tl</span>
              </CardBody>
            </Card>
            <Card className="col-lg-4 shadow">
              <CardBody>
                <span className="svg-icon menu-icon col-lg-2">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                    style={{
                      width: "50px",
                      height: "50px",
                      color: "green",
                    }}
                  />
                </span>
                <span className="col-lg-2">Yapılacak Ödemeler : 5Tl</span>
              </CardBody>
            </Card>
            <Card className="col-lg-4  ml-2 shadow">
              <CardBody>
                <span className="svg-icon menu-icon col-lg-2">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Money.svg")}
                    style={{
                      width: "50px",
                      height: "50px",
                      color: "green",
                    }}
                  />
                </span>
                <span className="col-lg-2">Toplam Ödeme : 5Tl</span>
              </CardBody>
            </Card>
          </div>
        </CardBody>

        <Card>
          <CardHeader title="Ödeme Vadeleri"></CardHeader>
          <CardBody>
            {" "}
            <Chart
              options={options1.options}
              series={options1.series}
              type="bar"
              width="100%"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Ödeme Listesi"></CardHeader>
          <CardBody>
            <PaymentList />
          </CardBody>
        </Card>
      </Card>
    </>
  );
};
