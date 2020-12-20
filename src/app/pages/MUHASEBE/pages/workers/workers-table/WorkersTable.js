// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workers/workersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../WorkersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useWorkersUIContext } from "../WorkersUIContext";

export function WorkersTable() {
  // Workers UI Context
  const workersUIContext = useWorkersUIContext();
  const workersUIProps = useMemo(() => {
    return {
      ids: workersUIContext.ids,
      setIds: workersUIContext.setIds,
      queryParams: workersUIContext.queryParams,
      setQueryParams: workersUIContext.setQueryParams,
      openEditWorkerDialog: workersUIContext.openEditWorkerDialog,
      openDeleteWorkerDialog: workersUIContext.openDeleteWorkerDialog,
    };
  }, [workersUIContext]);

  // Getting curret state of workers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.workers }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Workers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    workersUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchWorkers(workersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workersUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Adı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "İşe Giriş Tarihi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "İşten Çıkış Tarihi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "E-posta Adresi",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "gender",
      text: "T.C. Kimlik No/Vergi Kimlik No",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "iban",
      text: "IBAN",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditWorkerDialog: workersUIProps.openEditWorkerDialog,
        openDeleteWorkerDialog: workersUIProps.openDeleteWorkerDialog,
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
    sizePerPage: workersUIProps.queryParams.pageSize,
    page: workersUIProps.queryParams.pageNumber,
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
                  workersUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: workersUIProps.ids,
                  setIds: workersUIProps.setIds,
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
