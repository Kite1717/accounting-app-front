import React from "react";
import { Table } from "react-bootstrap";

export const PaymentList = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ödeme Tarihi</th>
            <th>Belge Tarihi</th>
            <th>İşlem Tipi</th>
            <th>Açıklama</th>
            <th>Vade Durumu</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Gider Faturası </td>
            <td>000001 </td>
            <td>Gecikmiş </td>
            <td>500,00 TL </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Gider Faturası </td>
            <td>000001 </td>
            <td>Gecikmiş </td>
            <td>500,00 TL </td>
          </tr>

          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Gider Faturası </td>
            <td>000001 </td>
            <td>Gecikmiş </td>
            <td>500,00 TL </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
