import React from "react";
import { Table } from "react-bootstrap";

export const CollectionList = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tahsilat Tarihi</th>
            <th>Fatura/Çek Tarihi</th>
            <th>Müşteri</th>
            <th>Vade Durumu</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Harun Turgut </td>
            <td>Gecikmiş</td>
            <td>15.600,00 </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Harun Turgut </td>
            <td>Gecikmiş</td>
            <td>15.600,00 </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Harun Turgut </td>
            <td>Gecikmiş</td>
            <td>15.600,00 </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2 Eylül 2019 </td>
            <td>1 Temmuz 2019 </td>
            <td>Harun Turgut </td>
            <td>Gecikmiş</td>
            <td>15.600,00 </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
