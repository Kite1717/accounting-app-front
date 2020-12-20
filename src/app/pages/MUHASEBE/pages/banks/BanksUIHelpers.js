export const BankStatusCssClasses = ["danger", "success", "info", ""];
export const BankStatusTitles = ["Suspended", "Active", "Pending", ""];
export const BankTypeCssClasses = ["success", "primary", ""];
export const BankTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 },
];
export const initialFilter = {
  filter: {
    accountType : null,
    bankCaseAccountName: null,
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10,
};
