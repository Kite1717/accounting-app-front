export const OutlayDocumentStatusCssClasses = ["danger", "success", "info", ""];
export const OutlayDocumentStatusTitles = [
  "Suspended",
  "Active",
  "Pending",
  "",
];
export const OutlayDocumentTypeCssClasses = ["success", "primary", ""];
export const OutlayDocumentTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    lastName: "",
    firstName: "",
    email: "",
    ipAddress: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10,
};
