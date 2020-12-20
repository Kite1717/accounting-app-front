// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUsersUIContext } from "../UsersUIContext";

export function UsersTable() {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      openEditUserDialog: usersUIContext.openEditUserDialog,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
    };
  }, [usersUIContext]);

  // Getting curret state of users list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Users Redux state
  const dispatch = useDispatch();

  
  useEffect(() => {
    // clear selections list
    usersUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchUsers(usersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.queryParams, dispatch]);
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
        openEditUserDialog: usersUIProps.openEditUserDialog,
        openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
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
    sizePerPage: usersUIProps.queryParams.pageSize,
    page: usersUIProps.queryParams.pageNumber,
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
                  usersUIProps.setQueryParams
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
