/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";
import { useIntl } from "react-intl";

export function AsideMenuList({ layoutProps }) {
  const intl = useIntl();
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/sale-reports", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/sale-reports">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">
              {" "}
              {intl.formatMessage({ id: "MENU.SALE.REPORTS" })}
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/outlay-reports", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/outlay-reports">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: "MENU.OUTLAY.REPORTS" })}
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/collection-reports",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/collection-reports">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: "MENU.COLLECTION.REPORTS" })}
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/payment-reports",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/payment-reports">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: "MENU.PAYMENT.REPORTS" })}
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/kdv-reports", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/kdv-reports">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: "MENU.KDV.REPORTS" })}
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
      </ul>
    </>
  );
}
