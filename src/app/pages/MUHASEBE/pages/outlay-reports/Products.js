import React from "react";
import { Card, CardBody } from "../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";

export const Products = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ürün</th>
                <th>Miktar</th>
                <th>Toplam Satış</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Alan Adı - nessworldwide.com.tr </td>
                <td>1,00 </td>
                <td>47,20 TL</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Alan Adı - xraysim.com </td>
                <td>1,00</td>
                <td>100,30 TL </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Kurumsal Web Uygulaması </td>
                <td>3,00</td>
                <td>12.750,00 TL </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
