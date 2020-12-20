// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/banksActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../BanksUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useBanksUIContext } from "../BanksUIContext";

export function BanksTable() {
  // Banks UI Context
  const banksUIContext = useBanksUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      queryParams: banksUIContext.queryParams,
      setQueryParams: banksUIContext.setQueryParams,
      openDetailBankDialog: banksUIContext.openDetailBankDialog,
      openEditBankDialog: banksUIContext.openEditBankDialog,
      openDeleteBankDialog: banksUIContext.openDeleteBankDialog,
    };
  }, [banksUIContext]);

  // Getting curret state of banks list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.banks }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Banks Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    banksUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchBanks(banksUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.queryParams, dispatch]);

  //formatters

  const priceFormatter =(cell,row)=>{
    return cell + " " +row.currencyType
  }
  const accountFormatter =(cell,row)=>{
    return cell === 0 ? "Banka" : "Kasa"
  }

  
  // Table columns
  const columns = [
    {
      dataField: "accountType",
      text: "Hesap Türü",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter : accountFormatter
    },
    {
      dataField: "bankCaseAccountName",
      text: "Hesap İsmi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "currencyType",
      text: "Döviz Cinsi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "currentPrice",
      text: "Bakiye",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter : priceFormatter,
    },

    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openDetailBankDialog : banksUIProps.openDetailBankDialog,
        openEditBankDialog: banksUIProps.openEditBankDialog,
        openDeleteBankDialog: banksUIProps.openDeleteBankDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: banksUIProps.queryParams.pageSize,
    page: banksUIProps.queryParams.pageNumber,
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
                  banksUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: banksUIProps.ids,
                  setIds: banksUIProps.setIds,
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
