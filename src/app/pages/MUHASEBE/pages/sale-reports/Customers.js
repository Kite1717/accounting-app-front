import React from "react";
import { Card, CardBody } from "../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";

export const Customers = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Müşteri</th>

                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Harun Turgut </td>

                <td>6.000,00 TL </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Burak Baydur </td>
                <td>22.243,00 TL </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
