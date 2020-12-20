// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/banks/banksActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../BanksUIHelpers";
import { Pagination } from "../../../../../../../_metronic/_partials/controls";
import { useBanksUIContext } from "../../BanksUIContext";

export function LastTransactionsTable({id}) {
  // Banks UI Context
  const banksUIContext = useBanksUIContext();
    const banksUIProps = useMemo(() => {
        return {
            initBank: banksUIContext.initBank,
            queryParams: banksUIContext.queryParams,
        };
    }, [banksUIContext]);

    // Banks Redux state
    const dispatch = useDispatch();
    const { actionsLoading, entities, totalCount } = useSelector(
        (state) => ({
            actionsLoading: state.banks.actionsLoading,
            entities: state.banks.bankForEdit,
        }),
        shallowEqual
    );

    useEffect(() => {
        // server call for getting Bank by id
        dispatch(actions.fetchBank(id));
    }, [id, dispatch]);

  //formatters

  const priceFormatter = (cell, row) => {
    return cell + " " + row.currencyType
  }
  const accountFormatter = (cell, row) => {
    return cell === 0 ? "Banka" : "Kasa"
  }


  // Table columns
  const columns = [
    {
      dataField: "date",
      text: "Tarih",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: accountFormatter
    },
    {
      dataField: "operationType",
      text: "İşlem Türü",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "description",
      text: "Açıklama",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "amount",
      text: "Tutar",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: priceFormatter,
    },
    {
      dataField: "balance",
      text: "Bakiye",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: priceFormatter,
    }
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
              isLoading={actionsLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={[]}
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
