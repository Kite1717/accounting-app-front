import React from "react";
import { Card, CardBody } from "../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";

export const Bills = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Müşteri</th>
                <th>Tarih</th>
                <th>Fatura Bilgi</th>
                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Harun Turgut </td>
                <td>27 Şubat 2020 </td>
                <td>000009 - TIP Yazılımı</td>
                <td>6.000,00 TL </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Burak Baydur </td>
                <td>5 Kasım 2020 </td>
                <td>000017</td> <td>22.243,00 TL </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
