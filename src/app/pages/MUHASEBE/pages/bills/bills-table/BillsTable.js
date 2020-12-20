// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/billsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../BillsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useBillsUIContext } from "../BillsUIContext";

export function BillsTable() {
  // Bills UI Context
  const billsUIContext = useBillsUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      setIds: billsUIContext.setIds,
      queryParams: billsUIContext.queryParams,
      setQueryParams: billsUIContext.setQueryParams,
      openEditBillDialog: billsUIContext.openEditBillDialog,
      openDeleteBillDialog: billsUIContext.openDeleteBillDialog,
    };
  }, [billsUIContext]);

  // Getting curret state of bills list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.bills }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Bills Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    billsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBills(billsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Müşteri Adı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "Belge Tarihi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Vade Durumu",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Fatura Toplamı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: billsUIProps.queryParams.pageSize,
    page: billsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  billsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: billsUIProps.ids,
                  setIds: billsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
