import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { Table, Tabs, Tab, Pagination } from "react-bootstrap";

import { All } from "./All";
import { Sales } from "./Sales";
import { Outlays } from "./Outlays";

export const KDVReportsPage = () => {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <Card>
        <CardHeader title="Aylara Göre KDV Toplamları"></CardHeader>
        <CardBody>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Dönem</th>
                <th>Hesaplanan KDV </th>
                <th>İndirilecek KDV </th>
                <th>Net KDV </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Aralık </td>
                <td>29.228,83 TL</td>
                <td>0,00 TL</td>
                <td>29.228,83 TL</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ocak </td>
                <td>29.228,83 TL</td>
                <td>0,00 TL</td>
                <td>29.228,83 TL</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Şubat </td>
                <td>29.228,83 TL</td>
                <td>0,00 TL</td>
                <td>29.228,83 TL</td>
              </tr>
            </tbody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Pagination>{items}</Pagination>
            <br />
          </div>
        </CardBody>

        <CardHeader title="KDV Dökümü"></CardHeader>
        <CardBody>
          <CardHeader>Ocak - 2018</CardHeader>
          <Tabs defaultActiveKey="tumu" id="uncontrolled-tab-example">
            <Tab eventKey="tumu" title="Tümü">
              <All />
            </Tab>
            <Tab eventKey="satislar" title="Satışlar">
              <Sales />
            </Tab>
            <Tab eventKey="giderler" title="Giderler">
              <Outlays />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};
