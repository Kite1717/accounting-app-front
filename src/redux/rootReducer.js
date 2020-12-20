import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
//import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
//import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";

import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { billsSlice } from "../app/pages/MUHASEBE/_redux/bills/billsSlice";
import { usersSlice } from "../app/pages/MUHASEBE/_redux/users/usersSlice";
import { productsSlice } from "../app/pages/MUHASEBE/_redux/products/productsSlice";
import { customersSlice } from "../app/pages/MUHASEBE/_redux/customers/customersSlice";
import { cashesSlice } from "../app/pages/MUHASEBE/_redux/cashes/cashesSlice";
import { banksSlice } from "../app/pages/MUHASEBE/_redux/banks/banksSlice";
import { outlaysSlice } from "../app/pages/MUHASEBE/_redux/outlays/outlaysSlice";
import { suppliersSlice } from "../app/pages/MUHASEBE/_redux/suppliers/suppliersSlice";
import { workersSlice } from "../app/pages/MUHASEBE/_redux/workers/workersSlice";
import { chequesSlice } from "../app/pages/MUHASEBE/_redux/cheques/chequesSlice";
import { outlayDocumentsSlice } from "../app/pages/MUHASEBE/_redux/outlayDocuments/outlayDocumentsSlice";
import { receiptsSlice } from "../app/pages/MUHASEBE/_redux/receipts/receiptsSlice";
import { incomingEBillsSlice } from "../app/pages/MUHASEBE/_redux/incomingEBills/incomingEBillsSlice";
import { outgoingEBillsSlice } from "../app/pages/MUHASEBE/_redux/outgoingEBills/outgoingEBillsSlice";
import { exchangesSlice } from "../app/pages/MUHASEBE/_redux/exchange/exchangesSlice";
import { customerCategoriesSlice } from "../app/pages/MUHASEBE/_redux/customerCategories/customerCategoriesSlice";
import { productCategoriesSlice } from "../app/pages/MUHASEBE/_redux/productCategories/productCategoriesSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  bills: billsSlice.reducer,
  users: usersSlice.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  cashes: cashesSlice.reducer,
  banks: banksSlice.reducer,
  outlays: outlaysSlice.reducer,
  suppliers: suppliersSlice.reducer,
  workers: workersSlice.reducer,
  cheques: chequesSlice.reducer,
  outlayDocuments: outlayDocumentsSlice.reducer,
  receipts: receiptsSlice.reducer,
  incomingEBills: incomingEBillsSlice.reducer,
  outgoingEBills: outgoingEBillsSlice.reducer,
  exchanges: exchangesSlice.reducer,
  customerCategories: customerCategoriesSlice.reducer,
  productCategories: productCategoriesSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
