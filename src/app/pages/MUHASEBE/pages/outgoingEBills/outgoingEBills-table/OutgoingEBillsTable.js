// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outgoingEBills/outgoingEBillsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../OutgoingEBillsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useOutgoingEBillsUIContext } from "../OutgoingEBillsUIContext";

export function OutgoingEBillsTable() {
  // OutgoingEBills UI Context
  const outgoingEBillsUIContext = useOutgoingEBillsUIContext();
  const outgoingEBillsUIProps = useMemo(() => {
    return {
      ids: outgoingEBillsUIContext.ids,
      setIds: outgoingEBillsUIContext.setIds,
      queryParams: outgoingEBillsUIContext.queryParams,
      setQueryParams: outgoingEBillsUIContext.setQueryParams,
      openEditOutgoingEBillDialog: outgoingEBillsUIContext.openEditOutgoingEBillDialog,
      openDeleteOutgoingEBillDialog: outgoingEBillsUIContext.openDeleteOutgoingEBillDialog,
    };
  }, [outgoingEBillsUIContext]);

  // Getting curret state of outgoingEBills list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.outgoingEBills }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // OutgoingEBills Redux state
  const dispatch = useDispatch();


  useEffect(() => {
    // clear selections list
    outgoingEBillsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchOutgoingEBills(outgoingEBillsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoingEBillsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "fullName",
      text: "Ad Soyad",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phoneNumber",
      text: "Telefon Numarası",
      sort: false,
      sortCaret: sortCaret,
    },


    {
      dataField: "address",
      text: "Adres",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "tcNo",
      text: "TC Numarası",
      sort: true,
      sortCaret: sortCaret,
    },

    {
      dataField: "action",
      text: "Düzenle",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOutgoingEBillDialog: outgoingEBillsUIProps.openEditOutgoingEBillDialog,
        openDeleteOutgoingEBillDialog: outgoingEBillsUIProps.openDeleteOutgoingEBillDialog,
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
    sizePerPage: outgoingEBillsUIProps.queryParams.pageSize,
    page: outgoingEBillsUIProps.queryParams.pageNumber,
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
                  outgoingEBillsUIProps.setQueryParams
                )}

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
