export const ProductCategoryStatusCssClasses = [
  "danger",
  "success",
  "info",
  "",
];
export const ProductCategoryStatusTitles = [
  "Suspended",
  "Active",
  "Pending",
  "",
];
export const ProductCategoryTypeCssClasses = ["success", "primary", ""];
export const ProductCategoryTypeTitles = ["Business", "Individual", ""];
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
