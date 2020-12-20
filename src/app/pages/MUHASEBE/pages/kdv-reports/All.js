import React from "react";
import { Table } from "react-bootstrap";

export const All = () => {
  return (
    <>
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
    </>
  );
};
