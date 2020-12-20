// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/productCategories/productCategoriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ProductCategoriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProductCategoriesUIContext } from "../ProductCategoriesUIContext";

export function ProductCategoriesTable() {
  // ProductCategories UI Context
  const productCategoriesUIContext = useProductCategoriesUIContext();
  const productCategoriesUIProps = useMemo(() => {
    return {
      ids: productCategoriesUIContext.ids,
      setIds: productCategoriesUIContext.setIds,
      queryParams: productCategoriesUIContext.queryParams,
      setQueryParams: productCategoriesUIContext.setQueryParams,
      openEditProductCategoryDialog:
        productCategoriesUIContext.openEditProductCategoryDialog,
      openDeleteProductCategoryDialog:
        productCategoriesUIContext.openDeleteProductCategoryDialog,
    };
  }, [productCategoriesUIContext]);

  // Getting curret state of productCategories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.productCategories }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ProductCategories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    productCategoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchProductCategories(productCategoriesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategoriesUIProps.queryParams, dispatch]);

  const stockFormatter = (cell, row) => {
    if (cell === "") {
      return "Stok Takibi Yok";
    } else if (cell === "0") {
      return "Stokta Yok";
    } else {
      return cell;
    }
  };

  const sellPriceFormatter = (cell, row) => {
    if (row.sellPriceExchange === "0") {
      return cell + " ₺";
    } else if (row.sellPriceExchange === "1") {
      return cell + " $";
    } else if (row.sellPriceExchange === "2") {
      return cell + " €";
    } else if (row.sellPriceExchange === "3") {
      return cell + " £";
    }
  };
  // Table columns
  const columns = [
    {
      dataField: "productCategoryName",
      text: "Ürün Adı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "currentAmount",
      text: "Eldeki Miktar",
      sort: true,
      sortCaret: sortCaret,
      formatter: stockFormatter,
    },
    {
      dataField: "sellPrice",
      text: "Satış Fiyatı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: sellPriceFormatter,
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductCategoryDialog:
          productCategoriesUIProps.openEditProductCategoryDialog,
        openDeleteProductCategoryDialog:
          productCategoriesUIProps.openDeleteProductCategoryDialog,
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
    sizePerPage: productCategoriesUIProps.queryParams.pageSize,
    page: productCategoriesUIProps.queryParams.pageNumber,
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
                  productCategoriesUIProps.setQueryParams
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
