/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
// import { AsideSearch } from "./AsideSearch";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import { KTUtil } from "./../../../_assets/js/components/util";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

//asides
import { AsideMenuIncome } from "./aside-menu/Income/AsideMenu";
import { AsideMenuEDocument } from "./aside-menu/E-Document/AsideMenu";
import { AsideMenuCash } from "./aside-menu/Cash/AsideMenu";
import { AsideMenuOutlay } from "./aside-menu/Outlay/AsideMenu";
import { AsideMenuProducts } from "./aside-menu/Products/AsideMenu";
import { AsideMenuReports } from "./aside-menu/Reports/AsideMenu";
import { AsideMenuDefinitions } from "./aside-menu/Definitions/AsideMenu";

export function Aside() {
  const intl = useIntl();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const tabs = {
    tabId1: "kt_aside_tab_1",
    tabId2: "kt_aside_tab_2",
    tabId3: "kt_aside_tab_3",
    tabId4: "kt_aside_tab_4",
    tabId5: "kt_aside_tab_5",
    tabId6: "kt_aside_tab_6",
    tabId7: "kt_aside_tab_7",
    tabId8: "kt_aside_tab_8",
  };
  const [activeTab, setActiveTab] = useState(tabs.tabId1);
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
  };

  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">
              {/* begin::Item */}
              <li
                aria-haspopup="true"
                className="nav-item mb-3"
                data-toggle="tooltip"
                title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-project">
                      {intl.formatMessage({ id: "MENU.DASHBOARD" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId1 && "active"}`}
                    to="/dashboard"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.USERS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">
                      {intl.formatMessage({ id: "MENU.USERS" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    className={`nav-link btn btn-icon btn-clean btn-lg `}
                    to="/users"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Group.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.INCOME" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="metronic-features">
                      {intl.formatMessage({ id: "MENU.INCOME" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId2)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId2 && "active"}`}
                    to="/bills"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Navigation/Plus.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.OUTLAY" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">
                      {intl.formatMessage({ id: "MENU.OUTLAY" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId3)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId3 && "active"}`}
                    to="/outlay-documents"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Navigation/Minus.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.CASH" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="project-management">
                      {intl.formatMessage({ id: "MENU.CASH" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId4)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId4 && "active"}`}
                    to="/banks"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Shopping/Money.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.PRODUCTS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="user-management">
                      {" "}
                      {intl.formatMessage({ id: "MENU.PRODUCTS" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId5)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId5 && "active"}`}
                    to="/products"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Shopping/Box2.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.DEFINITIONS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="categories">
                      {" "}
                      {intl.formatMessage({ id: "MENU.DEFINITIONS" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId8)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId8 && "active"}`}
                    to="/customer-categories"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Shopping/Barcode-scan.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.E-DOCUMENT" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="finance-accounting">
                      {intl.formatMessage({ id: "MENU.E-DOCUMENT" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId6)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId6 && "active"}`}
                    to="/e-document/incoming"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Files/Selected-file.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title={intl.formatMessage({ id: "MENU.REPORTS" })}
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="finance-accounting">
                      {intl.formatMessage({ id: "MENU.REPORTS" })}
                    </Tooltip>
                  }
                >
                  <NavLink
                    onClick={() => handleTabChange(tabs.tabId7)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId7 && "active"}`}
                    to="/dashboard"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Media/Equalizer.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}
            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="toggle-aside">Toggle Aside</Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            {/* end::Aside Toggle */}

            {/* begin::Search */}
            {layoutProps.extrasSearchDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-search">Quick Search</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Search */}

            {/* begin::Notifications */}
            {layoutProps.extrasNotificationsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-notifications">Notifications</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Notifications */}

            {/* begin::Quick Actions */}
            {layoutProps.extrasQuickActionsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-quick-actions">Quick Actions</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/Equalizer.svg"
                      )}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel */}
            {layoutProps.extrasQuickPanelDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-quick-panel">Quick Panel</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            <LanguageSelectorDropdown />
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && (
          <>
            {/* begin::Secondary */}
            <div className="aside-secondary d-flex flex-row-fluid">
              {/* begin::Workspace */}
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  {/* <AsideSearch  layoutProps = {layoutProps}isActive={activeTab === tabs.tabId1} /> */}
                  <AsideMenuIncome isActive={activeTab === tabs.tabId2} />
                  <AsideMenuOutlay isActive={activeTab === tabs.tabId3} />
                  <AsideMenuCash isActive={activeTab === tabs.tabId4} />
                  <AsideMenuProducts isActive={activeTab === tabs.tabId5} />
                  <AsideMenuEDocument isActive={activeTab === tabs.tabId6} />
                  <AsideMenuReports isActive={activeTab === tabs.tabId7} />
                  <AsideMenuDefinitions isActive={activeTab === tabs.tabId8} />
                </div>
              </div>
              {/* end::Workspace */}
            </div>
            {/* end::Secondary */}
          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
