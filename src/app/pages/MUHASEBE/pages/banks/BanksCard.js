import React, { useMemo, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import { BanksFilter } from "./banks-filter/BanksFilter";
import { BanksTable } from "./banks-table/BanksTable";
import { BanksGrouping } from "./banks-grouping/BanksGrouping";
import { useBanksUIContext } from "./BanksUIContext";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import * as actions from "../../_redux/exchange/exchangesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function BanksCard() {
  const banksUIContext = useBanksUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      newBankButtonClick: banksUIContext.newBankButtonClick,
      newCaseButtonClick: banksUIContext.newCaseButtonClick,
    };
  }, [banksUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.exchanges }),
    shallowEqual
  );
  const { exchangeForTRY } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {

    // server call by queryParams
    dispatch(actions.fetchExchangesByTRY());
    // eslint-disable-next-line react-hooks/exhaustive-deps

    console.log(exchangeForTRY)

  }, [dispatch]);



  return (
    <>
      <div className="col-lg-12" style={{ display: "flex" }}>
        <Card className="col-lg-4 mr-2 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-2">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}
                style={{
                  width: "50px",
                  height: "50px",
                  color: "green",
                }}
              />
            </span>
            <span className="col-lg-2">Kasalar Toplamı : 5Tl</span>
          </CardBody>
        </Card>
        <Card className="col-lg-4 ">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-2">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}
                style={{
                  width: "50px",
                  height: "50px",
                  color: "green",
                }}
              />
            </span>
            <span className="col-lg-2">Bankalar Toplamı : 5Tl</span>
          </CardBody>
        </Card>
        <Card className="col-lg-4  ml-2">
          <CardBody>
            <span className="svg-icon menu-icon col-lg-2">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}
                style={{
                  width: "50px",
                  height: "50px",
                  color: "green",
                }}
              />
            </span>
            <span className="col-lg-2">Nakit Toplamı : 5Tl</span>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Banks list">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={banksUIProps.newBankButtonClick}
            >
              New Bank
            </button>
            <button
              type="button"
              className="btn btn-warning ml-2"
              onClick={banksUIProps.newCaseButtonClick}
            >
              New Case
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <BanksFilter />
          {banksUIProps.ids.length > 0 && <BanksGrouping />}
          <BanksTable />
        </CardBody>
      </Card>
    </>
  );
}
