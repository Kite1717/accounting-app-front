// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/outlayDocuments/outlayDocumentsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../OutlayDocumentsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useOutlayDocumentsUIContext } from "../OutlayDocumentsUIContext";

export function OutlayDocumentsTable() {
  // OutlayDocuments UI Context
  const outlayDocumentsUIContext = useOutlayDocumentsUIContext();
  const outlayDocumentsUIProps = useMemo(() => {
    return {
      ids: outlayDocumentsUIContext.ids,
      setIds: outlayDocumentsUIContext.setIds,
      queryParams: outlayDocumentsUIContext.queryParams,
      setQueryParams: outlayDocumentsUIContext.setQueryParams,
      openEditOutlayDocumentDialog:
        outlayDocumentsUIContext.openEditOutlayDocumentDialog,
      openDeleteOutlayDocumentDialog:
        outlayDocumentsUIContext.openDeleteOutlayDocumentDialog,
    };
  }, [outlayDocumentsUIContext]);

  // Getting curret state of outlayDocuments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.outlayDocuments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // OutlayDocuments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    outlayDocumentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchOutlayDocuments(outlayDocumentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlayDocumentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "Firstname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Lastname",
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
      dataField: "gender",
      text: "Gender",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOutlayDocumentDialog:
          outlayDocumentsUIProps.openEditOutlayDocumentDialog,
        openDeleteOutlayDocumentDialog:
          outlayDocumentsUIProps.openDeleteOutlayDocumentDialog,
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
    sizePerPage: outlayDocumentsUIProps.queryParams.pageSize,
    page: outlayDocumentsUIProps.queryParams.pageNumber,
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
                  outlayDocumentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: outlayDocumentsUIProps.ids,
                  setIds: outlayDocumentsUIProps.setIds,
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
