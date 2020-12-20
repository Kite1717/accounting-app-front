import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";

import { DashboardPage } from "./pages/DashboardPage";

import { UsersPage } from "./pages/MUHASEBE/pages/users/UsersPage";
import { ProductsPage } from "./pages/MUHASEBE/pages/products/ProductsPage";
import { CustomersPage } from "./pages/MUHASEBE/pages/customers/CustomersPage";
import { BillsPage } from "./pages/MUHASEBE/pages/bills/BillsPage";
import { CashesPage } from "./pages/MUHASEBE/pages/cashes/CashesPage";
import { BanksPage } from "./pages/MUHASEBE/pages/banks/BanksPage";
import { OutlaysPage } from "./pages/MUHASEBE/pages/outlays/OutlaysPage";
import { SuppliersPage } from "./pages/MUHASEBE/pages/suppliers/SuppliersPage";
import { WorkersPage } from "./pages/MUHASEBE/pages/workers/WorkersPage";
import { ChequesPage } from "./pages/MUHASEBE/pages/cheques/ChequesPage";
import { OutlayDocumentsPage } from "./pages/MUHASEBE/pages/outlay-documents/OutlayDocumentsPage";
import { ReceiptsPage } from "./pages/MUHASEBE/pages/receipts/ReceiptsPage";

//report Pages
import { SaleReportsPage } from "./pages/MUHASEBE/pages/sale-reports/SaleReportsPage";
import { OutlayReportsPage } from "./pages/MUHASEBE/pages/outlay-reports/OutlayReportsPage";
import { CollectionReportsPage } from "./pages/MUHASEBE/pages/collection-reports/CollectionReportsPage";
import { PaymentReportsPage } from "./pages/MUHASEBE/pages/payment-reports/PaymentReportsPage";
import { KDVReportsPage } from "./pages/MUHASEBE/pages/kdv-reports/KDVReportsPage";
import { IncomingEBillsPage } from "./pages/MUHASEBE/pages/incomingEBills/IncomingEBillsPage";
import { OutgoingEBillsPage } from "./pages/MUHASEBE/pages/outgoingEBills/OutgoingEBillsPage";

import { CustomerCategoriesPage } from "./pages/MUHASEBE/pages/customer-categories/CustomerCategoriesPage";
import { ProductCategoriesPage } from "./pages/MUHASEBE/pages/product-categories/ProductCategoriesPage";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />

        <ContentRoute path="/users" component={UsersPage} />
        <ContentRoute path="/products" component={ProductsPage} />
        <ContentRoute path="/customers" component={CustomersPage} />
        <ContentRoute path="/bills" component={BillsPage} />
        <ContentRoute path="/cashes" component={CashesPage} />
        <ContentRoute path="/banks" component={BanksPage} />
        <ContentRoute path="/outlays" component={OutlaysPage} />
        <ContentRoute path="/suppliers" component={SuppliersPage} />
        <ContentRoute path="/workers" component={WorkersPage} />
        <ContentRoute path="/cheques" component={ChequesPage} />
        <ContentRoute
          path="/e-document/incoming"
          component={IncomingEBillsPage}
        />
        <ContentRoute
          path="/e-document/outgoing"
          component={OutgoingEBillsPage}
        />
        <ContentRoute
          path="/outlay-documents"
          component={OutlayDocumentsPage}
        />
        <ContentRoute path="/receipts" component={ReceiptsPage} />

        <ContentRoute
          path="/customer-categories"
          component={CustomerCategoriesPage}
        />

        <ContentRoute
          path="/product-categories"
          component={ProductCategoriesPage}
        />

        {/*********************  reports *********************/}
        <ContentRoute path="/sale-reports" component={SaleReportsPage} />
        <ContentRoute path="/outlay-reports" component={OutlayReportsPage} />
        <ContentRoute
          path="/collection-reports"
          component={CollectionReportsPage}
        />
        <ContentRoute path="/payment-reports" component={PaymentReportsPage} />
        <ContentRoute path="/kdv-reports" component={KDVReportsPage} />
        {/*********************  reports *********************/}

        <ContentRoute path="/builder" component={BuilderPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
